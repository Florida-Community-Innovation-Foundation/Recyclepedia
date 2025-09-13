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
    .map((row) => _.pick(row, ["Latitude", "Longitude", "Category"]))
    .value();
}

async function testN(img, token) {
  console.log("Image: ", img);

  const response = await fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
    method: 'POST',
    headers: {
      //'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzU2NzgyODkxLCJpYXQiOjE3NTY3ODI4OTEsImV4cCI6MTc1Njc4NjQ5MSwic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6Im5ydmltazdsemZ4cXVoZno4MmdhcjV6cm10aGJxbTM5IiwianRpIjoiOTQ4MkJDQkU3QjQwM0E2NEFCRTVGNEQwQ0E5OUE1QjQifQ.VVGWceKWb4UpiG8Oi53ESOVPJDoiLcc7oloI0NUp4hKzUcyG2LIIASRBodQDNhwIVFamnDzwQJgp5drkf_dDR2xYxSe4tZeNQN7MBeP7UYFNSvrGnUn0wK_PrMK1_UgkCuA2131oLBfiZ9hRltuLsPl8zswB6R3WmkD3ZfXQXvFYaZtJhMaIUPhPLzPa_9PhQx2ayHqdB-5VX2QJs1onfOVaS_s3VjzA2DvHYDmNHrHgytrGKlvptbl1DkBm9ZhfOFjgP8DhPuOjMNTIl0I8WgKnTYPJbJazYOn8Rmrl24mlGYf62DZ1YcOCfTjU0jX5CASvo_veF-QU3a4ctj0NwA',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { "data": "https://www.nyckel.com/assets/example.jpg" }
    )
  });


  //   const response = await fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
  //     method: 'POST',
  //     headers: {
  //         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzU2MTUyODEzLCJpYXQiOjE3NTYxNTI4MTMsImV4cCI6MTc1NjE1NjQxMywic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6Im5ydmltazdsemZ4cXVoZno4MmdhcjV6cm10aGJxbTM5IiwianRpIjoiNkQ5QUJGRjIwMjdDRjBCQzE1RTU2MzBENzFEN0MyOEMifQ.alx7ZwB7FArOwEbyHcYbK9z8YtVBmU96DfTQe9VglpmKbdGzIWqTSmZA_n-swg3qoiwgWOEqeNRkcApRodlKOv-0-5tl_FNJVBnMd7ru45Pb4SpbrPrOon-c02OL3eXejy11OtcI5Ah_fdqElSQcHBT2nLohpp4d_BOSVJl4GLQV21TfulDg4pUyU8fUos659_WEIHcxVSImKaIDZFYwrFO3Q19L53D_mQrcNMFXYH38hEpfQ2ZJAkXsBQaI-rkj69HU-4J7KbhaKnqtQrnJvBQH5r5iW4RjXj9MA-VC_tYKUg5kMRAqSL2xhar1PPpQGd-NDDK1DoVjuMK3m8wHMA',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(
  //         //{"data":"https://www.nyckel.com/assets/example.jpg"}
  //         {"data":img}
  //     )
  // });

  const data = await response.json();
  console.log("Data: ", data);
  return data.labelName;
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

// gets image and location from frontend and uses nyckel
router.post("/itemData", async (req, res) => {
  console.log("req body: ", req.body);

  const base64String = req.body.image.base64;
  const mediaType = 'image/jpeg';
  const imageURI = `data:${mediaType};base64,${base64String}`;

  const response = await testN(imageURI, req.accesstoken);

  const r = { text: response };
  return res.status(200).json(r);
});

export default router;
