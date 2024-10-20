import { Request, Response } from "express";
import MenuItemService from "./service";
import Generator from "../../utils/generator";
import { ErrorHandler } from "../../utils/common-function";
import { IQueryBody } from "../menu-item/interface";
// import LoggerService from "../../config/logger/service";

class MenuItemController {
  private menuItemService: MenuItemService;
  // private loggerService: LoggerService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.menuItemService = new MenuItemService();
    // this.loggerService = new LoggerService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const category = req.query.category as string;

      const queryBody: IQueryBody = { page, limit, category };
      const menuItems = await this.menuItemService.getAllOrders(queryBody);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: menuItems[0].data,
        paginationData: menuItems[0].paginationData[0],
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };

  public getOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const category = await this.menuItemService.getOrder(id);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Order retrieved successfully",
        data: category,
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };
}

export default new MenuItemController();
