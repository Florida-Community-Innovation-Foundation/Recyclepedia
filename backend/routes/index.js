import express from "express";
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
        [city]: {
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
    .map((row) => _.pick(row, ["Latitude", "Longitude", "Category"]))
    .value();
}

router.get("/curbsideData", async (_, res) => {
  const workbook = await readBaselineData();
  const sheets = [
    workbook.Sheets["Curbside"],
    workbook.Sheets["Data Collection"],
  ];
  const curbsideItemCategories = xlsx.utils.sheet_to_json(sheets[0]);
  let curbsideData = mapCityToCategories(curbsideItemCategories);
  const cityLocations = xlsx.utils.sheet_to_json(sheets[1]);
  curbsideData = mapLocationToCity(curbsideData, cityLocations);
  return res.json(curbsideData);
});

router.get("/itemsData", async (_, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  return res.json(await getItemDetails(itemsData));
});

router.get("/dropOffData", async (_, res) => {
  const workbook = await readBaselineData();
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  const dropOffLocations = getDropoffLocations(itemsData);
  return res.json(dropOffLocations);
});

router.post("/recyclingIdentifier", (req, res) => {
  req.pipe(fs.createWriteStream("./uploads/image" + Date.now() + ".png"));
  res.send("OK");
});

export default router;
