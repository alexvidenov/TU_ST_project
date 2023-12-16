import { MoodleRawUserType, MoodleRawUserTypeArr } from "./excel-types";
import { parseAsync } from "json2csv";
import { MoodleImportUserTypeArr } from "./moodle-types";
import { Passwords, fetchPasswords } from "./remote-sync";

const PHPPassHash = require("node-php-password");

const mapFormats = (
  users: MoodleRawUserTypeArr,
  passwords: Passwords
): MoodleImportUserTypeArr => {
  return users.map((u: MoodleRawUserType) => {
    const namesArr = u.Имена.split(new RegExp(" "));
    const pass = passwords[u["Фак. №"]];
    return {
      username: u["Фак. №"],
      password: pass ?? PHPPassHash.hash(u["Фак. №"]),
      firstname: namesArr[0],
      middlename: namesArr[1],
      lastname: namesArr[2],
      email: u.Поща,
      cohort1: `${u.Факултет} / ${u["СПЕЦ."]} / ${new Date().getFullYear()}`,
    };
  });
};

export const convertCsv = async (
  users: MoodleRawUserTypeArr
): Promise<{ csv: string; moodle_mapped: MoodleImportUserTypeArr }> => {
  const passwords = await fetchPasswords();
  const mapped = mapFormats(users, passwords);
  return { csv: await parseAsync(mapped), moodle_mapped: mapped };
};
