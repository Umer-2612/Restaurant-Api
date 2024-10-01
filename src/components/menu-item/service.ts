import { IMenuItemSchema, IMenuItemService } from "./interface";
import MenuItemDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import CategoryService from "../category/service";

/**
 * Service class for handling menu-related operations.
 * Implements IMenuItemService to provide methods for managing menu.
 */
class MenuItemSchema implements IMenuItemService {
  private menuItemDao: MenuItemDAO;
  private categoryService: CategoryService;

  constructor() {
    this.menuItemDao = new MenuItemDAO();
    this.categoryService = new CategoryService();
  }

  /**
   * Create a new menu item.
   * @param {IMenuItemSchema} data - The menu item data to be created.
   * @returns {Promise<IMenuItemSchema>} - The created menu item.
   * @throws {ErrorHandler} - Throws an error if the menu item cannot be created.
   */
  async createMenuItem(data: IMenuItemSchema): Promise<IMenuItemSchema> {
    try {
      // Check if the category exists
      const categoryExists = await this.categoryService.getCategoryById(
        data.category as string
      );
      if (!categoryExists) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Category does not exist",
        });
      }

      return await this.menuItemDao.createMenuItem(data);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to create menu item",
      });
    }
  }

  async getMenuItems(): Promise<IMenuItemSchema[]> {
    try {
      return await this.menuItemDao.getMenuItems();
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve menu items",
      });
    }
  }

  async getMenuItemById(id: string): Promise<IMenuItemSchema> {
    try {
      const menuItem = await this.menuItemDao.getMenuItemById(id);
      if (!menuItem) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Menu Item not found",
        });
      }
      return menuItem;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve menu item",
      });
    }
  }

  async updateMenuItem(id: string, data: Partial<IMenuItemSchema>): Promise<IMenuItemSchema> {
    try {
      const updatedMenuItem = await this.menuItemDao.updateMenuItem(id, data);
      if (!updatedMenuItem) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Menu item not found for update",
        });
      }
      return updatedMenuItem;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to update menu item",
      });
    }
  }

  async deleteMenuItem(id: string): Promise<void> {
    try {
      await this.menuItemDao.deleteMenuItem(id);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to delete menu item",
      });
    }
  }
}

export default MenuItemSchema;
