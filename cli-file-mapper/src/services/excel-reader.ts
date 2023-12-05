import XLSX = require("xlsx");
import path = require("path");
import { MoodleRawUserTypeArr } from "./excel-types";

export const readExcel = (filepath: string): MoodleRawUserTypeArr => {
  const pathName = path.join(process.cwd(), filepath);

  const workbook = XLSX.readFile(pathName);
  const sheet = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheet];

  const data = XLSX.utils.sheet_to_json(worksheet);

  return data as MoodleRawUserTypeArr;
};
