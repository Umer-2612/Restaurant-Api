// controller.ts

import { Request, Response } from "express";
import MenuItemService from "./service";
import Generator from "../../utils/generator";
import { ErrorHandler } from "../../utils/common-function";
import MenuItemValidation from "./validation";

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
   * @method createMenuItem
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Creates a new menu-item based on the request body.
   */
  public createMenuItem = async (req: Request, res: Response): Promise<any> => {
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

      // Call the service to create the menu item
      const menuItem = await this.menuItemService.createMenuItem(req.body);
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
 * @method getMenuItems
 * @param {Request} req - The request object from Express.
 * @param {Response} res - The response object from Express.
 * @returns {Promise<any>}
 * @description Retrieves all menu items.
 */
  public getMenuItems = async (req: Request, res: Response): Promise<any> => {
    try {
      const menuItems = await this.menuItemService.getMenuItems();
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Menu items retrieved successfully",
        data: menuItems,
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
  public updateMenuItem = async (req: Request, res: Response): Promise<any> => {
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

      const updatedMenuItem = await this.menuItemService.updateMenuItem(
        id,
        req.body
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
