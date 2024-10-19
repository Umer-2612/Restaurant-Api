// src/utils/loggerUtilsService.ts

import moment from "moment";
import logger from "./index"; // Adjust the path as necessary
import { Request } from "express";

export type reqInfo = {
  method: string;
  originalUrl: string;
};

class LoggerService {
  public async logError(req: Request, error: any) {
    const logData = {
      date: moment().format(), // Format the date
      method: req.method,
      url: req.originalUrl,
      status: error.code || error.status || 500,
      message: error.message || "An error occurred",
    };

    logger.error(JSON.stringify(logData)); // Log the error in JSON format
  }

  public async logInfo(reqInfo: reqInfo, message: string) {
    return logger.info(
      JSON.stringify({
        date: moment().format(), // Format the date for better readability
        method: reqInfo.method,
        url: reqInfo.originalUrl,
        message,
      })
    );
  }
}

export default LoggerService;
