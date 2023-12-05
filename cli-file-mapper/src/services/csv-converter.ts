import { MoodleRawUserType, MoodleRawUserTypeArr } from "./excel-types";
import { parseAsync } from "json2csv";
import { MoodleImportUserTypeArr } from "./moodle-types";

const mapFormats = (users: MoodleRawUserTypeArr): MoodleImportUserTypeArr => {
  return users.map((u: MoodleRawUserType) => {
    const namesArr = u.Имена.split(new RegExp(" "));
    return {
      username: u["Фак. №"],
      password: u["Фак. №"],
      firstname: namesArr[0],
      middlename: namesArr[1],
      lastname: namesArr[2],
      email: u.Поща,
      cohort1: `${u.Факултет} / ${u["СПЕЦ."]} / ${new Date().getFullYear()}`,
    };
  });
};

export const convertCsv = async (users: MoodleRawUserTypeArr) => {
  const mapped = mapFormats(users);
  return parseAsync(mapped);
};
