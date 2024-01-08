/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, rawUploadsCollection } from "../services";
import { UsersSyncReq } from "./types";
import * as functions from "firebase-functions";

// receives a yearly batch from the CLI
app.post(
  "/moodle/sync/users",
  async (req: functions.Request, res: functions.Response<any>) => {
    const { users }: UsersSyncReq = req.body;

    const batchRef = rawUploadsCollection().doc("batches");
    await batchRef.set({
      users,
    });

    res.status(200).send({});
    return;
  }
);
