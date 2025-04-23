// const admin = require('firebase-admin');
//import admin from 'firebase-admin';
//import serviceAccount from './ServiceAccountKey.json' assert { type: "json" };
// const serviceAccount = require('./ServiceAccountKey.json');

import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "ServiceAccountKey.json");

const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf-8"));


import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export {admin, db};
// The above code initializes a Firebase Admin SDK instance using a service account key.
// It exports the initialized admin instance and Firestore database instance for use in other parts of the application.
// The service account key should be kept secure and not exposed in public repositories.   