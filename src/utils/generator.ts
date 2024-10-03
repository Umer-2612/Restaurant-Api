import { Response } from "express";

class Generator {
  public async sendResponse({
    res,
    statusCode = 200,
    success = true,
    message,
    data,
    paginationData,
  }: {
    res: Response;
    statusCode?: number;
    success?: boolean;
    message: string;
    data?: any;
    paginationData?: any;
  }) {
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
