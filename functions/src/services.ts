import express = require("express");
import * as admin from "firebase-admin";

admin.initializeApp();

export const app = express();

export const db = admin.firestore();

export const usersCollection = () => db.collection("users");
export const rawUploadsCollection = () => db.collection("raw_batches");
export const authCollection = () => db.collection("auth");
