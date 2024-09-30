import { Request, Response } from "express";
import MenuService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";

class MenuController {

  public createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await MenuService.createCategory(req.body);
      Generator.sendResponse({
        res,
        message: "Category created successfully",
        data: category,
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
  }

  public updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await MenuService.updateCategory(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Category updated successfully",
        data: category,
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
  }

  public getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await MenuService.getCategories();
      Generator.sendResponse({
        res,
        message: "Categories found",
        data: categories,
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
  }

  public deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await MenuService.deleteCategory(req.params.id);
      Generator.sendResponse({
        res,
        message: "Category deleted successfully",
        data: category,
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
  }

  public createMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const menuItem = await MenuService.createMenuItem(req.body);
      Generator.sendResponse({
        res,
        message: "Menu item created successfully",
        data: menuItem,
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
  }

  public updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const menuItem = await MenuService.updateMenuItem(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Menu item updated successfully",
        data: menuItem,
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
  }

  public getMenuItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const menuItems = await MenuService.getMenuItems();
      Generator.sendResponse({
        res,
        message: "Menu items found",
        data: menuItems,
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
  }

  public deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const menuItem = await MenuService.deleteMenuItem(req.params.id);
      Generator.sendResponse({
        res,
        message: "Menu item deleted successfully",
        data: menuItem,
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
  }
}

export default new MenuController();
