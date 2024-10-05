// controller.ts

import { Request, Response } from "express";
import MenuItemService from "./service";
import Generator from "../../utils/generator";
import { ErrorHandler } from "../../utils/common-function";
import MenuItemValidation from "./validation";
// import { IPaginationBody } from "./interface";
import { IQueryBody } from "./interface";
import { RequestWithUser } from "../auth/interface";

/**
 * @class MenuController
 * @description Controller for handling menu-Item-related requests.
 */
class MenuItemController {
  private menuItemService: MenuItemService;
  private menuItemValidation: MenuItemValidation;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.menuItemService = new MenuItemService();
    this.menuItemValidation = new MenuItemValidation();
  }

  /**
   * @private
   * @method handleError
   * @param {Response} res - The response object from Express.
   * @param {any} error - The error object.
   * @returns {Promise<any>}
   * @description Handles errors and sends an appropriate response.
   */
  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  /**
   * @public
   * @method getMenuItems
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Retrieves all menu items from the database, excluding deleted records.
   * The request query parameters must include the page and limit of the pagination.
   * The response will contain the retrieved menu items, along with the pagination data.
   */
  public getAllMenuItems = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const validateBody = this.menuItemValidation.validatePaginationBody(
      req.query
    );

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
      const category = req.query.category as string;

      const queryBody: IQueryBody = { page, limit, category };
      const menuItems = await this.menuItemService.getAllMenuItems(queryBody);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Menu items retrieved successfully",
        data: menuItems[0].data,
        paginationData: menuItems[0].paginationData,
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method createMenuItem
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Creates a new menu-item based on the request body.
   */
  public createMenuItem = async (
    req: RequestWithUser,
    res: Response
  ): Promise<any> => {
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
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method getMenuItemById
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Retrieves a menu item by its ID.
   */
  public getMenuItemById = async (
    req: Request,
    res: Response
  ): Promise<any> => {
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
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method updateMenuItem
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Updates an existing menu item by its ID.
   */
  public updateMenuItem = async (
    req: RequestWithUser,
    res: Response
  ): Promise<any> => {
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
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method  deleteMenuItem
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Deletes a menu item by its ID.
   */
  public deleteMenuItem = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      if (!user) {
        return Generator.sendResponse({
          res,
          statusCode: 401,
          success: false,
          message: "Unauthorized",
        });
      }

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
      await this.handleError(res, error);
    }
  };
}

export default new MenuItemController();
