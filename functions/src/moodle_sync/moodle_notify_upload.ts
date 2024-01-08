/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, rawUploadsCollection, usersCollection } from "../services";
import { MoodleUserModel } from "./types";
import * as functions from "firebase-functions";

// moodle plugin notifies that a CLI-generated file has been uploaded
app.get(
  "/moodle/notify",
  async (req: functions.Request, res: functions.Response<any>) => {
    const lastBatch = await rawUploadsCollection().doc("batches").get();

    const users: MoodleUserModel[] = lastBatch.get("users");

    await Promise.all(
      users.map(async (u) => {
        const userRef = usersCollection().doc(u.facNumber);
        userRef.set(u, { merge: true });
      })
    );

    res.status(200).send({ users });
    return;
  }
);
