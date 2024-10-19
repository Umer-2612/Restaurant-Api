import { Request, Response } from "express";
import UserService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import { RequestWithUser } from "../auth/interface";
import LoggerService from "../../config/logger/service";

class UserController {
  private userService: UserService;
  private loggerService: LoggerService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.userService = new UserService();
    this.loggerService = new LoggerService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);

      Generator.sendResponse({
        res,
        message: "User found",
        data: user,
      });
    } catch (error: any) {
      this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };

  public userInfo = async (
    req: RequestWithUser,
    res: Response
  ): Promise<any> => {
    try {
      const user = await this.userService.getUserById(String(req?.user?._id));

      // Send a successful response directly
      return res.status(200).json({
        success: true,
        message: "User found",
        data: user,
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };
}

export default new UserController();
