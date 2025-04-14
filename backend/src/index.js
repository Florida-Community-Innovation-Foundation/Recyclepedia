import express from "express";
import firebase from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABASE_URL", // Replace with your Realtime Database URL
});

const db = firebase.database(); // Get a reference to the database

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
