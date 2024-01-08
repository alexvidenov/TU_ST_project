/* eslint-disable @typescript-eslint/no-var-requires */
import { app, usersCollection } from "../services";
import { MoodleUserModel, UpdatePassReq } from "./types";
import * as functions from "firebase-functions";

const PHPPassHash = require("node-php-password");

app.get(
  "/moodle/passwords",
  async (_: functions.Request, res: functions.Response<any>) => {
    const passwords: { [key: string]: string } = {};
    const usersRef = await usersCollection().listDocuments();
    await Promise.all(
      usersRef.map(async (d) => {
        const data = (await d.get()).data() as MoodleUserModel;
        passwords[data.facNumber] = data.password;
      })
    );

    res.status(200).send({ passwords });
    return;
  }
);

app.post(
  "/moodle/update/password",
  async (req: functions.Request, res: functions.Response<any>) => {
    const { facNumber, newPass }: UpdatePassReq = req.body;

    const result = await usersCollection()
      .where("facNumber", "==", facNumber)
      .get();

    if (result.empty) {
      res.status(422).send({ msg: "User doesn't exist" });
      return;
    }

    const user = result.docs[0];
    const hashedPass = PHPPassHash.hash(newPass);
    await user.ref.update({ password: hashedPass });

    res.status(200).send({ msg: "Password updated" });
    return;
  }
);
