import { Request, Response } from "express";
import OrderService from "./service";
import OrderValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import { IPaginationBody } from "./interface";

class OrderController {
  private orderService: OrderService;
  private orderValidation: OrderValidation;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.orderService = new OrderService();
    this.orderValidation = new OrderValidation();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public createOrder = async (req: Request, res: Response): Promise<any> => {
    const { error } = this.orderValidation.validateCreateOrder.validate(req.body);

    if (error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: error.details[0].message,
      });
    }

    try {
      let data = req.body;
      const saveOrder = await this.orderService.createOrder(data);

      Generator.sendResponse({
        res,
        message: "Order placed successfully",
        data: saveOrder,
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };

  public getOrderDetails = async (req: Request, res: Response): Promise<any> => {
    const validateBody = this.orderValidation.validatePaginationBody(req.query);

    if (validateBody.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: validateBody.error.details[0].message,
      });
    }

    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const paginationData: IPaginationBody = { page, limit };

      const getOrders = await this.orderService.getOrderDetails(paginationData);

      Generator.sendResponse({
        res,
        message: "Orders found",
        data: getOrders[0].data,
        paginationData: getOrders[0].paginationData[0],
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };
}

export default new OrderController();
