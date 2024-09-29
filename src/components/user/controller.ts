import { Request, Response } from "express";
import UserService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";

class UserController {
  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        Generator.sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "User not found",
        });
        return;
      }

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
