import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dateTimeHelper from "../api/utils/dateTimeHelper.js";

// Path config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = path.join(
  __dirname,
  "./storage",
  `${dateTimeHelper.getCurrentDate()}_errors_logs.log`
);

const formatErrLog = (uuid, req, errorMsg) => {
  const dateTime = `${dateTimeHelper.getCurrentDateTime()}`;
  const reqInfo = `${req.method}:${req.url}`;
  const logFormatted = `${uuid} - ${dateTime} - ${reqInfo} - ${errorMsg}\n`;

  return logFormatted;
};

const logger = (uuid, req, message) => {
  const errorlog = formatErrLog(uuid, req, message);
  fs.appendFile(fileName, errorlog, "utf-8", (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export default logger;
