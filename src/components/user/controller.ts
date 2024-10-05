import { Request, Response } from "express";
import UserService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import { RequestWithUser } from "../auth/interface";

class UserController {
  private userService: UserService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.userService = new UserService();
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
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  };

  public userInfo = async (
    req: RequestWithUser,
    res: Response
  ): Promise<void> => {
    try {
      const user = await this.userService.getUserById(String(req?.user?._id));

      Generator.sendResponse({
        res,
        message: "User found",
        data: user,
      });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  };
}

export default new UserController();
