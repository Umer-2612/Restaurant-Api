import {
  IMenuItemSchema,
  IMenuItemService,
  IPaginationBody,
} from "./interface";
import MenuItemDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import CategoryService from "../category/service";

/**
 * Service class for handling menu-related operations.
 * Implements IMenuItemService to provide methods for managing menu.
 * @implements {IMenuItemService}
 */
class MenuItemSchema implements IMenuItemService {
  /**
   * Data Access Object for interacting with the menu item database.
   * @type {MenuItemDAO}
   */
  private menuItemDao: MenuItemDAO;

  /**
   * Service for handling category-related operations.
   * @type {CategoryService}
   */
  private categoryService: CategoryService;

  /**
   * Constructor for the MenuItemSchema service class.
   */
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

  /**
   * Retrieve all menu items.
   * @returns {Promise<{ data: IMenuItemSchema[], totalCount: number }>} - An array of menu items.
   * @throws {ErrorHandler} - Throws an error if the menu items cannot be retrieved.
   */
  async getMenuItems(data: IPaginationBody): Promise<any> {
    try {
      const rowLimit = data.limit ? data.limit : 10;
      const rowSkip = data.page ? (data.page - 1) * rowLimit : 0;

      const pipeline = [
        {
          $match: { recordDeleted: false },
        },
        {
          $lookup: {
            from: "category",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $facet: {
            paginationData: [
              { $count: "total" }, // Count the total number of records
              {
                $addFields: {
                  currentPage: data.page > 0 ? Number(data.page) : 1, // Return the current page
                },
              },
            ],
            data: [
              { $sort: { createdAt: -1 } }, // Sort by creation date
              { $skip: rowSkip }, // Skip the documents for pagination
              { $limit: rowLimit }, // Limit the number of documents returned
              {
                $project: {
                  itemName: 1,
                  itemDescription: 1,
                  itemPrice: 1,
                  category: {
                    _id: "$categoryDetails._id",
                    name: "$categoryDetails.name",
                  },
                },
              },
            ],
          },
        },
      ];

      const res = await this.menuItemDao.getMenuItems(pipeline);
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve menu items",
      });
    }
  }

  /**
   * Retrieve a menu item by its ID.
   * @param {string} id - The ID of the menu item to retrieve.
   * @returns {Promise<IMenuItemSchema>} - The retrieved menu item.
   * @throws {ErrorHandler} - Throws an error if the menu item is not found or cannot be retrieved.
   */
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

  /**
   * Retrieve all menu items by category ID.
   * @param {string} categoryId - The ID of the category to retrieve menu items from.
   * @returns {Promise<IMenuItemSchema[]>} - An array of menu items.
   * @throws {ErrorHandler} - Throws an error if the menu items cannot be retrieved.
   */
  async getMenuItemsByCategoryId(
    categoryId: string,
    paginationData: IPaginationBody
  ): Promise<{ data: IMenuItemSchema[]; totalCount: number }> {
    try {
      const menuItems = await this.menuItemDao.getMenuItemsByCategoryId(
        categoryId,
        paginationData
      );
      return menuItems;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve menu items",
      });
    }
  }

  /**
   * Update a menu item by its ID.
   * @param {string} id - The ID of the menu item to update.
   * @param {Partial<IMenuItemSchema>} data - The updated menu item data.
   * @returns {Promise<IMenuItemSchema>} - The updated menu item.
   * @throws {ErrorHandler} - Throws an error if the menu item is not found or cannot be updated.
   */
  async updateMenuItem(
    id: string,
    data: Partial<IMenuItemSchema>
  ): Promise<IMenuItemSchema> {
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

  /**
   * Delete a menu item by its ID.
   * @param {string} id - The ID of the menu item to delete.
   * @returns {Promise<void>} - A promise indicating the deletion status.
   * @throws {ErrorHandler} - Throws an error if the menu item cannot be deleted.
   */
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
