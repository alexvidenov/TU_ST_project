import { MoodleRawUserType } from "./excel-types";
import { MoodleImportUserType, MoodleRemoteUserModelDto } from "./moodle-types";
import * as axios from "axios";

export type Passwords = { [key: string]: string };

// facNumber -> pass
export const fetchPasswords = async (): Promise<Passwords> => {
  const passwords = await axios.default.get(
    `${process.env.CLOUD_FUNCS_URL}/moodle/passwords`
  );

  return passwords.data;
};

export const remoteSync = async (users: {
  [key: string]: MoodleImportUserType & MoodleRawUserType;
}) => {
  const remoteUsersReq: MoodleRemoteUserModelDto[] = Object.values(users).map(
    (u) => {
      return {
        cohorts: [u.cohort1],
        course: u.КУРС,
        degree: u.ОКС,
        email: u.email,
        faculty: u.Факултет,
        firstname: u.firstname,
        middlename: u.middlename,
        lastname: u.lastname,
        password: u.password,
        username: u.username,
        specialty: u["СПЕЦ."],
        facNumber: u["Фак. №"],
      };
    }
  );

  return await axios.default.post(
    `${process.env.CLOUD_FUNCS_URL}/moodle/sync/users`,
    {
      users: remoteUsersReq,
    }
  );
};
