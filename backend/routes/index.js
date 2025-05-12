// import { VertexAI } from "@google-cloud/vertex-ai";
import express from "express";
import _ from "lodash";
import xlsx from "xlsx";

const router = express.Router();

// Initialize Vertex AI client
// const vertex_ai = new VertexAI({
//   project: "your-project-id",
//   region: "us-east1",
// });
// const model = vertex_ai.getGenerativeModel({
//   model: "gemini-pro",
//   generationConfig: {
//     maxOutputTokens: 200,
//     temperature: 0.7,
//   },
// });

// Read data from excel workbook with baseline data
const workbook = xlsx.readFile("public/Baseline Data 2022.xlsx");

function mapCityToItem(data) {
  const cities = _.chain(data[0])
    .reduce((result, value, key) => {
      return _.concat(result, value);
    }, [])
    .slice(2)
    .value();
  return _.chain(cities)
    .map((city, index) => {
      return {
        [city]: _.chain(data)
          .slice(1)
          .filter((row) => {
            return _.includes(row[`__EMPTY_${index + 2}`], "Yes");
          })
          .map((row) => row["__EMPTY"])
          .value(),
      };
    })
    .value();
}

function getItemDetails(data) {
  return _.chain(data)
    .slice(1)
    .map((row) => {
      return { ..._.pick(row, ["Item", "Category", "Description"]), Image: "" };
    })
    .value();
}

function getDropoffLocations(data) {
  return _.chain(data)
    .slice(1)
    .map((row) => _.pick(row, ["Latitude", "Longitude", "Category"]))
    .value();
}

router.get("/curbsideData", (req, res) => {
  const sheet = workbook.Sheets["Curbside"];
  const data = xlsx.utils.sheet_to_json(sheet);
  return res.json(mapCityToItem(data));
});

router.get("/itemsData", (req, res) => {
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  return res.json(getItemDetails(itemsData));
});

router.get("/dropOffData", (req, res) => {
  const sheet = workbook.Sheets["Items"];
  const itemsData = xlsx.utils.sheet_to_json(sheet);
  const dropOffLocations = getDropoffLocations(itemsData);
  if (req.query.category) {
    return res.json(
      _.chain(dropOffLocations)
        .filter(
          (dropOffLocation) =>
            dropOffLocation["Category"] === req.query.category,
        )
        .map((dropOffLocation) =>
          _.pick(dropOffLocation, ["Latitude", "Longitude"]),
        )
        .value(),
    );
  }
  return res.json(dropOffLocations);
});
export default router;
