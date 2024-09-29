import { Response } from "express";

class Generator {
  public async sendResponse({
    res,
    statusCode = 200,
    success = true,
    message,
    data,
  }: {
    res: Response;
    statusCode?: number;
    success?: boolean;
    message: string;
    data?: any;
  }) {
    return res.status(statusCode).json({
      success: success,
      message: message,
      data: data,
    });
  }
}

export default new Generator();
