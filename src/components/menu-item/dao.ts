import MenuItemSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IMenuItemSchema } from "./interface";

/**
 * @class MenuItemDAO
 * @description Data Access Object for interacting with the menu item database.
 */
export default class MenuItemDAO {
  /**
   * @async
   * @method createMenuItem
   * @param {IMenuItemSchema} data - The menu item data to be created.
   * @returns {Promise<IMenuItemSchema>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Creates a new menu item in the database.
   */
  async createMenuItem(data: IMenuItemSchema): Promise<IMenuItemSchema> {
    try {
      const res = await MenuItemSchema.create(data);
      return res;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to create menu item",
      });
    }
  }

  /**
   * @async
   * @method getMenuItems
   * @returns {Promise<IMenuItemSchema[]>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Retrieves all menu items from the database, excluding deleted records.
   */
  async getMenuItems(pipeline: any): Promise<any> {
    try {
      const result = await MenuItemSchema.aggregate(pipeline);

      return result;

      // // Check the structure of result[0], where "paginationData" and "data" arrays reside
      // const menuItems = result[0]?.data || []; // Access the 'data' facet for menu items
      // const totalCount = result[0]?.paginationData.length
      //   ? result[0].paginationData[0].total
      //   : 0; // Access the 'paginationData' facet for the total count

      // return {
      //   data: menuItems,
      //   totalCount: totalCount,
      // };
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve menu items",
      });
    }
  }

  /**
   * @async
   * @method getMenuItemById
   * @param {string} id - The ID of the menu item to retrieve.
   * @returns {Promise<IMenuItemSchema | null>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Retrieves a specific menu item by its ID from the database.
   */
  async getMenuItemById(id: string): Promise<IMenuItemSchema | null> {
    try {
      let join = {
        path: "category",
        select: "name",
        match: { recordDeleted: false },
      };
      const res = await MenuItemSchema.findOne({
        _id: id,
        recordDeleted: false,
      }).populate(join);
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve menu item",
      });
    }
  }

  // /**
  //  * Retrieves all menu items associated with a specific category ID from the database.
  //  * @param {string} categoryId - The ID of the category to retrieve menu items for.
  //  * @returns {Promise<{ data: IMenuItemSchema[], totalCount: number }>} - An array of IMenuItemSchema objects representing the menu items associated with the category.
  //  * @throws {ErrorHandler} - Throws an ErrorHandler if the database operation fails.
  //  */
  // async getMenuItemsByCategoryId(
  //   categoryId: string,
  //   data: IPaginationBody
  // ): Promise<{ data: IMenuItemSchema[]; totalCount: number }> {
  //   try {
  //     let rowLimit = data.limit ? data.limit : 10;
  //     let rowSkip = data.page ? data.page * rowLimit - rowLimit : 0;
  //     const res = await MenuItemSchema.find({
  //       category: categoryId,
  //       recordDeleted: false,
  //     })
  //       .skip(rowSkip)
  //       .limit(rowLimit);
  //     const total = await MenuItemSchema.countDocuments({
  //       category: categoryId,
  //       recordDeleted: false,
  //     });
  //     const result = {
  //       data: res,
  //       totalCount: total,
  //     };
  //     return result;
  //   } catch (error: any) {
  //     throw new ErrorHandler({
  //       statusCode: 500,
  //       message: "Database Error: Unable to retrieve menu items",
  //     });
  //   }
  // }

  /**
   * @async
   * @method updateMenuItem
   * @param {string} id - The ID of the menu item to update.
   * @param {Partial<IMenuItemSchema>} data - The updated menu item data.
   * @returns {Promise<IMenuItemSchema | null>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Updates an existing menu item in the database by its ID.
   */
  async updateMenuItem(
    id: string,
    data: Partial<IMenuItemSchema>
  ): Promise<IMenuItemSchema | null> {
    try {
      const res = await MenuItemSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to update menu item",
      });
    }
  }

  /**
   * @async
   * @method deleteMenuItem
   * @param {string} id - The ID of the menu item to delete.
   * @returns {Promise<any>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Soft deletes a menu item by marking it as deleted in the database.
   */
  async deleteMenuItem(id: string): Promise<any> {
    try {
      await MenuItemSchema.findByIdAndUpdate(id, {
        recordDeleted: true,
      });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to delete menu item",
      });
    }
  }
}
