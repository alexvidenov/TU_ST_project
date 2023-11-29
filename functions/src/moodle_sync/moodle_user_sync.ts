import { app, db, usersCollection } from "../services";
import { UsersSyncReq } from "./types";
import * as functions from "firebase-functions";

app.post(
  "/moodle/sync/users",
  async (req: functions.Request, res: functions.Response<any>) => {
    const { users }: UsersSyncReq = req.body;

    await Promise.all(
      users.map(async (u) => {
        const userRef = usersCollection().doc(u.facNumber);
        userRef.set(u, { merge: true });
      })
    );

    res.status(200).send({});
    return;
  }
);
