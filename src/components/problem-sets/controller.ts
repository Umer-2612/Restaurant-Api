import { Response } from "express";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import { IProblemSetSchema } from "./interface";
import ProblemSetService from "./service";
import { RequestWithUser } from "../auth/interface";

class ProblemSetController {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public getAll = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const body = {
        userId: req.user?._id as string,
      };

      const data: IProblemSetSchema[] = await ProblemSetService.getAll(body);

      Generator.sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Fetch all problem sets successfully.",
        data,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public create = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const data: IProblemSetSchema = await ProblemSetService.create(req.body);

      Generator.sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Problem set created successfully.",
        data,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public update = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const data: IProblemSetSchema | null = await ProblemSetService.update(
        req.params.id,
        req.body
      );

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Problem set updated successfully.",
        data,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      await ProblemSetService.delete(req.params.id);

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Problem set deleted successfully.",
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };
}

export default new ProblemSetController();
