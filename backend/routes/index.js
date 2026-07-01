import express from "express";
import _ from "lodash";
import xlsx from "xlsx";
import getBaselineData from "../utils/firebaseStorage.js";
import getNyckelToken from "../middelware/tokenService.js";
import { classifyAluminum } from "../utils/aluminumClassifier.js";
import { logger } from "../utils/logging.js";

const router = express.Router();

// Express 4 doesn't catch rejected promises from async handlers — without
// this wrapper a single failed Firebase/Nyckel call would crash the process.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// The baseline spreadsheet changes rarely; cache it so every request doesn't
// re-download and re-parse the whole xlsx from Firebase Storage.
const BASELINE_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedWorkbook = null;
let cachedAt = 0;

async function readBaselineData() {
  if (cachedWorkbook && Date.now() - cachedAt < BASELINE_CACHE_TTL_MS) {
    return cachedWorkbook;
  }
  const file = await getBaselineData();
  cachedWorkbook = xlsx.read(file);
  cachedAt = Date.now();
  return cachedWorkbook;
}

function mapCityToCategories(data) {
  const cities = _.chain(data[0]).keys().slice(2).value();

  return _.chain(cities)
    .map((city) => {
      return {
        [String(city)]: {
          items: _.chain(data)
            .filter((row) => {
              return row[city] === "Yes";
            })
            .map((row) => row["Category"])
            .value(),
        },
      };
    })
    .value();
}

function mapLocationToCity(data, locations) {
  return _.chain(data)
    .map((row) => {
      const city = _.keys(row)[0];
      // A city can exist in the Curbside sheet but be missing from the Data
      // Collection sheet (typo or partial spreadsheet edit) — skip it rather
      // than crashing the whole endpoint.
      const location = _.find(locations, (loc) => loc["City"] === city);
      if (!location) {
        logger.warn(`City "${city}" has no row in the Data Collection sheet; skipping`);
        return null;
      }
      return {
        [city]: {
          items: row[city]["items"],
          latitude: location["Latitude"],
          longitude: location["Longitude"],
        },
      };
    })
    .compact()
    .value();
}

async function getItemDetails(data) {
  return _.chain(data)
    .map((row) => {
      return {
        name: row["Item"],
        category: row["Category"],
        imageURL: row["Image URL"],
        canRecycle: row["canRecycle"] === "Yes",
        description: _.trim(row["Description"]),
      };
    })
    .uniqBy("name")
    .value();
}

function getDropoffLocations(data) {
  return _.chain(data)
    .map((row) => _.pick(row, ["Latitude", "Longitude", "Category", "Name", "Street"]))
    .value();
}

/*

Exceptions:

Glass: Hialeah, Key Biscayne, Hialeah Gardens, 

Cardboard: Golden Beach, Hialeah Gardens, North Miami, North Miami Beach

Aluminum Foil: Golden Beach, Hialeah, Hialeah Gardens, Homestead, Miami, Miami Shores, North Miami Beach, Sweetwater, Virginia Gardens, El Portal, Miami Beach, Miami Springs, Opa-locka, South Miami, Indian Creek, Bal Harbour, Medley, Aventura, Sunny Isles, Miami Lakes, Palmetto Bay, Doral, Miami Gardens, Culter Bay, Florida City, North Bay Village

*/

// this should probably check Curbside sheet, but that's for later
// checks for category exceptions in location
// [note]: category is not the same as category in Baseline Data excel, it's arbitrary
function crossCheck(category, location) {
  if (category === "glass") {
    switch (location) {
      case "Hialeah":
      case "Key Biscayne":
      case "Hialeah Gardens":
        //console.log("Glass fail at ", location); // debug
        return false;

      default:
        return true;
    }
  }

  if (category === "cardboard") {
    switch (location) {
      case "Golden Beach":
      case "Hialeah Gardens":
      case "North Miami":
      case "North Miami Beach":
        //console.log("Cardboard fail at ", location); // debug
        return false;

      default:
        return true;
    }
  }

  // a lot of places don't take aluminum foil, however, cans are aluminum and tagged as such so this needs to be fixed
  if (category === "aluminum") {
    switch (location) {
      case "Golden Beach":
      case "Hialeah":
      case "Hialeah Gardens":
      case "Homestead":
      case "Miami":
      case "Miami Shores":
      case "North Miami Beach":
      case "Sweetwater":
      case "Virginia Gardens":
      case "El Portal":
      case "Miami Beach":
      case "Miami Springs":
      case "Opa-locka":
      case "South Miami":
      case "Indian Creek":
      case "Bal Harbour":
      case "Medley":
      case "Aventura":
      case "Sunny Isles":
      case "Miami Lakes":
      case "Palmetto Bay":
      case "Doral":
      case "Miami Gardens":
      case "Culter Bay":
      case "Florida City":
      case "North Bay Village":
        //console.log("Aluminum fail at ", location); // debug
        return false;

      default:
        return true;
    }
  }

  // when in doubt, no
  return false;
}

// analyzes label to see if item is recyclable
// most of nyckel's labels are accurate except some locations have exceptions
async function parseLabelMunicipality(data, municipality, base64Image) {
  const label = data.labelName.toString().toLowerCase();
  //console.log("Label: ", label); // debug
  //console.log("Municipality: ", municipality); // debug

  // the order of the labels is precedence for messages
  // (ewaste label has the word trash in it, but we want to return a special message for batteries so much check ewaste first)
  const badLabels = [ "ewaste", "trash", "non-recyclable", "not recyclable", "special drop-off" ];
  const warningLabels = ["cardboard", "glass"];

  // check if label has Trash, Non-Recyclable, Not recyclable, or Special drop-off
  // if it does, not recyclable
  for (const badlabel of badLabels) {
    if (label.includes(badlabel)) {
      if (badlabel === "ewaste") {
        return "This item is not recyclable! Check the Drop-Off tab to find a Collection Center!";
      }

      return "This item is not recyclable!";
    }
  }

  const testingLocation = municipality;

  // Stage 2: if Nyckel says aluminum, use local model to distinguish foil vs can
  if (label.includes("aluminum")) {
    // The local model only decodes JPEG; on any other format (or a corrupt
    // image) fall back to the conservative foil rules instead of failing the
    // whole scan.
    let aluminumResult = null;
    try {
      aluminumResult = await classifyAluminum(base64Image);
    } catch (err) {
      logger.warn(`Aluminum stage-2 classification failed: ${err.message}`);
    }

    // Aluminum cans are recyclable everywhere
    if (aluminumResult && aluminumResult.label === "aluminum can") {
      return "This item is recyclable!";
    }

    // Aluminum foil has city exceptions
    if (crossCheck("aluminum", testingLocation)) {
      return "This item is recyclable!";
    }
    return `This item is not recyclable in ${testingLocation}!`;
  }

  // check if label has Cardboard or Glass
  for (const warningLabel of warningLabels) {
    // if it does cross check 
    if (label.includes(warningLabel)) {
      if (crossCheck(warningLabel, testingLocation)) {
        return "This item is recyclable!";
      }

      return `This item is not recyclable in ${testingLocation}!`;
    }
  }
  
  // if doesn't have either, recyclable
  return "This item is recyclable!";
}

// takes in the image uri to process, Nyckel acces token, and location
// returns the text to display to the user
async function processScan(image, token, municipality) {
  // get image label from Nyckel
  const response = await fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { "data": image }
    )
  });

  if (!response.ok) {
    logger.error(`Nyckel invoke failed with status ${response.status}`);
    return "We are currently experiencing technical difficulties, Please try again later.";
  }

  const data = await response.json();
  logger.info({ labelName: data.labelName, confidence: data.confidence }, "Nyckel result");

  // Any error shape (rate limit, quota, changed API) lacks labelName
  if (!data.labelName) {
    logger.error({ nyckelResponse: data }, "Nyckel response missing labelName");
    return "We are currently experiencing technical difficulties, Please try again later.";
  }

  // Extract raw base64 from the data URI for the local aluminum model
  const base64Image = image.replace(/^data:image\/\w+;base64,/, '');
  const result = await parseLabelMunicipality(data, municipality, base64Image);

  return result;
}

router.get("/curbsideData", asyncHandler(async (req, res) => {
  const workbook = await readBaselineData();
  const sheets = [
    workbook.Sheets["Curbside"],
    workbook.Sheets["Data Collection"],
  ];

  // loads items, item categories, and which area they can be recycled
  const curbsideItemCategories = xlsx.utils.sheet_to_json(sheets[0]);
  let curbsideData = mapCityToCategories(curbsideItemCategories);
  const cityLocations = xlsx.utils.sheet_to_json(sheets[1]);
  curbsideData = mapLocationToCity(curbsideData, cityLocations);

  return res.status(200).json(curbsideData);
}));

router.get("/itemsData", asyncHandler(async (req, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  return res.json(await getItemDetails(itemsData));
}));

router.get("/dropOffData", asyncHandler(async (req, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  const dropOffLocations = getDropoffLocations(itemsData);
  return res.json(dropOffLocations);
}));

// middleware to add Nyckel token to incoming requests
router.use("/itemData", asyncHandler(async (req, res, next) => {
  req.nyckelAccessToken = await getNyckelToken();
  next();
}));

// gets image and location from frontend and uses nyckel to decide recyclability
router.post("/itemData", async (req, res) => {
  try {
    if (!req.body?.image?.base64) {
      return res.status(400).json({ text: "No image was provided. Please take a photo and try again." });
    }
    const base64String = req.body.image.base64;

    // detect image format from base64 header, fall back to jpeg
    const mimeMatch = base64String.match(/^data:(image\/\w+);base64,/);
    let mediaType = 'image/jpeg';
    let rawBase64 = base64String;
    if (mimeMatch) {
      mediaType = mimeMatch[1];
      rawBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');
    }

    const imageURI = `data:${mediaType};base64,${rawBase64}`;

    const response = await processScan(imageURI, req.nyckelAccessToken, req.body.city);
    return res.status(200).json({ text: response });
  } catch (err) {
    console.error("Error processing image: ", err);
    return res.status(200).json({ text: "We couldn't process this image. Please try again with a different photo." });
  }
});

export default router;
