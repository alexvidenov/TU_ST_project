import { Firestore, getFirestore } from "firebase-admin/firestore";
import {
  initializeApp,
  getApp,
  getApps,
  App as FirebaseApp,
  ServiceAccount,
} from "firebase-admin/app";
import { credential } from "firebase-admin";
import adminSdkConfig from "./firebase-adminsdk.json";

let app: FirebaseApp, db: Firestore;

if (!getApps().length) {
  try {
    app = initializeApp({
      credential: credential.cert(adminSdkConfig as ServiceAccount),
    });
    db = getFirestore(app);
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  db = getFirestore(app);
}

export { app, db };
