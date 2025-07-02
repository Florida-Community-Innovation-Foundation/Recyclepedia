import express, { json } from "express";
import _ from "lodash";
import xlsx from "xlsx";
import getBaselineData from "../utils/firebaseStorage.js";

const router = express.Router();

async function readBaselineData() {
  const file = await getBaselineData();
  return xlsx.read(file);
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
      return {
        [city]: {
          items: row[city]["items"],
          latitude: _.filter(
            locations,
            (location) => location["City"] === city,
          )[0]["Latitude"],
          longitude: _.filter(
            locations,
            (location) => location["City"] === city,
          )[0]["Longitude"],
        },
      };
    })
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
async function parseLabel(data) {
  const label = data.labelName.toString().toLowerCase();
  //console.log("Label: ", label);  // debug

  // the order of the labels is precedence for messages
  // (ewaste label has the word trash in it, but we want to return a special message for batteries so much check ewaste first)
  const badLabels = [ "ewaste", "trash", "non-recyclable", "not recyclable", "special drop-off" ];
  const warningLabels = ["aluminum", "cardboard", "glass"];

  // check if label has Trash, Non-Recyclable, Not recyclable, or Special drop-off
  // if it does, not recyclable
  for (const badlabel of badLabels) {
    if (label.includes(badlabel)) {
      if (badlabel === "ewaste") {
        //console.log("Item had ewaste label"); // debug
        return "This item is not recyclable! Check the Drop-Off tab to find a Collection Center!";
      }

      //console.log("Item had bad label, ", badlabel); // debug
      return "This item is not recyclable!";
    }
  }

  // this is for testing, location should be passed to this func as well as label
  const testingLocation = "Miami";

  // check if label has Aluminum, Cardboard, or Glass
  for (const warningLabel of warningLabels) {
    // if it does cross check
    if (label.includes(warningLabel)) {
      if (crossCheck(warningLabel, testingLocation)) {
        //console.log("Cross check with ", testingLocation, " was good!"); // debug
        return "This item is recyclable!";
      }

      //console.log("Cross check with ", testingLocation, " was not good."); // debug
      return "This item is not recyclable in ", testingLocation, "!";
    }
  }


  // if doesn't have either, recyclable
  //console.log("Item was found to be recyclable"); // debug
  return "This item is recyclable!";
}

async function testN(img, token) {
  //console.log("Image: ", img);

  // [note]: this needs to be fixed
  const response = await fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzU5MzU0MTE3LCJpYXQiOjE3NTkzNTQxMTcsImV4cCI6MTc1OTM1NzcxNywic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6Im5ydmltazdsemZ4cXVoZno4MmdhcjV6cm10aGJxbTM5IiwianRpIjoiQzU3N0QxQjIzN0M5RjBGMTJFNDQ2QjQwODVDQTQ1RjQifQ.j7_5840XvVSJCrr8nz5SJzhMHHmzKfPB4LU1abI9n2iWExttMhM5CThIKAGGCjs7A54VWHQZBZPUHtFcdPglItElP9KdxMWKWGh5oKEkRbY67BtaaOc2qHWrxS4jNStzIkKgM_AMenkM9c1ZdLrPI3n6NSDFEfAgzKQneKLtJcJRDNvQprpmGPymIhVDFHbgBkkNlYXW6w2gJNAw0c_nCbppNRaUodv59PuKzVfKSOmiBWAPJV417TcKf2kxVxJhLtGO70MmxC7tpoWV1pmyvv9-C9gWFJygiLK2JX5LwzrSBuPRdm2n2jUh5Rb_fhktBGxf2OtAsPoP5g-Ebu9wIw',
      // this should use token passed in for auth, but not working rn
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { "data": "https://pakoro.com/wp-content/uploads/2025/02/A-person-unpacking-a-large-pizza-box-1024x576.webp" }  // testing

      //{ "data": img } // actual
    )
  });

  const data = await response.json();
  //console.log("Data: ", data);

  // this should pass location as well
  const result = await parseLabel(data);
  //console.log("Result: ", result);

  return result;
}

router.get("/curbsideData", async (req, res) => {
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

  res.send(curbsideData).status(200);
  //return res.json(curbsideData);
});

router.get("/itemsData", async (req, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  return res.json(await getItemDetails(itemsData));
});

router.get("/dropOffData", async (req, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  const dropOffLocations = getDropoffLocations(itemsData);
  return res.json(dropOffLocations);
});

// gets image and location from frontend and uses nyckel to decide recyclability
router.post("/itemData", async (req, res) => {
  //console.log("req body: ", req.body);

  const base64String = req.body.image.base64;
  const mediaType = 'image/jpeg';
  const imageURI = `data:${mediaType};base64,${base64String}`;

  // location from frontend should be passed to testN as well
  const response = await testN(imageURI, req.accesstoken);

  const r = { text: response };
  return res.status(200).json(r);
});

export default router;
