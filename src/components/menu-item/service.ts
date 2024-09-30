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
        message: error.message || "Failed to create category",
      });
    }
  }
}

export default MenuItemSchema;
