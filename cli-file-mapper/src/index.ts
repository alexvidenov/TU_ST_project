#!/usr/bin/env node
import { Command, program } from "commander";
import { readExcel } from "./services/excel-reader";
import { convertCsv } from "./services/csv-converter";
import { fsWriteCsv } from "./services/fs";
import { mergeArrBy } from "./utils";
import { remoteSync } from "./services/remote-sync";

const DEFAULT_MOODLE_RAW_EXCEL_FILENAME = "RawStudentData.xlsx";
const DEFAULT_MOODLE_IMPORT_CSV_FILENAME = "MoodleUserImport";

interface Options {
  file: string | undefined;
}

type CustomCommand = Command & Options;

const prog: CustomCommand = program as CustomCommand;

prog.version("1.0.0").description("Moodle file mapper");

prog
  .command("map")
  .description("map")
  .option("-f,--file [file_path]", "file name");

prog.parse(process.argv);

const main = async () => {
  const cmd = prog.commands[0];
  let filepath = DEFAULT_MOODLE_RAW_EXCEL_FILENAME;
  if (cmd) {
    const cmdOpts: Options = cmd.opts();
    filepath = cmdOpts.file ?? DEFAULT_MOODLE_RAW_EXCEL_FILENAME;
  }

  const users = readExcel(filepath);

  const csv = await convertCsv(users);

  fsWriteCsv(DEFAULT_MOODLE_IMPORT_CSV_FILENAME, csv.csv);

  const merged = mergeArrBy(csv.moodle_mapped, users, "username", "Фак. №");

  await remoteSync(merged);
};

main();
