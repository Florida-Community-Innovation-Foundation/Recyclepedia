import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { applicationDefault, cert, initializeApp } from "firebase-admin/app";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.join(__dirname, "..", "private", "serviceAccountKey.json");

// Use the local service-account key when present (local dev); otherwise fall
// back to Application Default Credentials (Cloud Run / gcloud auth) so the
// server can boot from a fresh clone without the gitignored key file.
const credential = fs.existsSync(serviceAccountPath)
  ? cert(JSON.parse(fs.readFileSync(serviceAccountPath, "utf8")))
  : applicationDefault();

initializeApp({
  credential,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
});

const bucket = getStorage().bucket();

export default async function getBaselineData() {
  const fileRef = bucket.file(process.env.BASELINE_DATA_FILE_PATH);
  const downloadURL = await getDownloadURL(fileRef);
  const response = await fetch(downloadURL);
  if (!response.ok) {
    throw new Error(`Baseline data download failed with status ${response.status}`);
  }
  const file = await response.arrayBuffer();
  return file;
}
