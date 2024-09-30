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
}

export default new MenuItemController();
