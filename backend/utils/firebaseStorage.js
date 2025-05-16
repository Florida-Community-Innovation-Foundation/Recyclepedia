import { cert, initializeApp } from "firebase-admin/app";
import { getDownloadURL, getStorage } from "firebase-admin/storage";
import serviceAccount from "../private/serviceAccountKey.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
});

const bucket = getStorage().bucket();

export default async function getBaselineData() {
  const fileRef = bucket.file(process.env.BASELINE_DATA_FILE_PATH);
  const downloadURL = await getDownloadURL(fileRef);
  const response = await fetch(downloadURL);
  const file = await response.arrayBuffer();
  return file;
}
