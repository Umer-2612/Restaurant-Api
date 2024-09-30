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
}
