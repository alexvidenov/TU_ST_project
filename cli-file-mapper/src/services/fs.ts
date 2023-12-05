import fs = require("fs");

export const fsWriteCsv = (filename: string, csv: string) => {
  fs.writeFileSync(`${filename}.csv`, csv);
};
