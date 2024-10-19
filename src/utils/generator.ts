import { Response } from "express";
import LoggerService, { reqInfo } from "../config/logger/service";

class Generator {
  private loggerService: LoggerService;

  constructor() {
    this.loggerService = new LoggerService();
  }

  public async sendResponse({
    res,
    statusCode = 200,
    success = true,
    message,
    data,
    paginationData,
    reqInfo,
  }: {
    res: Response;
    statusCode?: number;
    success?: boolean;
    message: string;
    data?: any;
    paginationData?: any;
    reqInfo?: reqInfo;
  }) {
    if (reqInfo) {
      this.loggerService.logInfo(reqInfo, message);
    }

    if (paginationData) {
      return res.status(statusCode).json({
        success: success,
        message: message,
        data,
        paginationData,
      });
    } else {
      return res.status(statusCode).json({
        success: success,
        message: message,
        data,
      });
    }
  }
}

export default new Generator();
