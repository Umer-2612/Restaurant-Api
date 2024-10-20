// controller.ts

import { Request, Response } from "express";
import MenuItemService from "./service";
import Generator from "../../utils/generator";
import { ErrorHandler } from "../../utils/common-function";
import MenuItemValidation from "./validation";
import { IQueryBody } from "./interface";
import { RequestWithUser } from "../auth/interface";
import LoggerService from "../../config/logger/service";

class MenuItemController {
  private menuItemService: MenuItemService;
  private menuItemValidation: MenuItemValidation;
  private loggerService: LoggerService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.menuItemService = new MenuItemService();
    this.menuItemValidation = new MenuItemValidation();
    this.loggerService = new LoggerService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public getAll = async (req: Request, res: Response): Promise<any> => {
    const validateBody = this.menuItemValidation.validatePaginationBody(
      req.query
    );

    if (validateBody.error) {
      // If validation fails, return the error response
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
      const category = req.query.category as string;

      const queryBody: IQueryBody = { page, limit, category };
      const menuItems = await this.menuItemService.getAllMenuItems(queryBody);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Menu items retrieved successfully",
        data: menuItems[0].data,
        paginationData: menuItems[0].paginationData[0],
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };

  public create = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      // Validate the request body using the validation schema
      const { error } = this.menuItemValidation.createMenuItemBody.validate(
        req.body
      );
      if (error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: error.details[0].message,
        });
      }

      let menuData = req.body;
      menuData.createdBy = req?.user?._id;
      menuData.lastUpdatedBy = req?.user?._id;
      menuData.itemImagePath = req?.body?.filePath;

      // Call the service to create the menu item
      const menuItem = await this.menuItemService.createMenuItem(menuData);
      return Generator.sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Menu item created successfully",
        data: menuItem,
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };

  public getOne = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const idValidation = this.menuItemValidation.validateId(id); // Validate ID

    if (idValidation.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: idValidation.error.details[0].message,
      });
    }

    try {
      const menuItem = await this.menuItemService.getMenuItemById(id);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Menu item retrieved successfully",
        data: menuItem,
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };

  public update = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const idValidation = this.menuItemValidation.validateId(id); // Validate ID

      if (idValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: idValidation.error.details[0].message,
        });
      }

      const bodyValidation =
        this.menuItemValidation.updateMenuItemBody.validate(req.body);

      if (bodyValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: bodyValidation.error.details[0].message,
        });
      }

      let menuData = req.body;
      menuData.updatedBy = req?.user?._id;
      menuData.itemImagePath = req?.body?.filePath;

      const updatedMenuItem = await this.menuItemService.updateMenuItem(
        id,
        menuData
      );
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Menu item updated successfully",
        data: updatedMenuItem,
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const idValidation = this.menuItemValidation.validateId(id); // Validate ID

      if (idValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: idValidation.error.details[0].message,
        });
      }

      await this.menuItemService.deleteMenuItem(id);

      return Generator.sendResponse({
        res,
        statusCode: 200, // No content
        message: "Menu item deleted successfully",
      });
    } catch (error: any) {
      await this.loggerService.logError(req, error);
      await this.handleError(res, error);
    }
  };
}

export default new MenuItemController();
