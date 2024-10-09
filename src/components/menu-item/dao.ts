import MenuItemSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IMenuItemSchema } from "./interface";

export default class MenuItemDAO {
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

  async getMenuItems(pipeline: any): Promise<any> {
    try {
      const result = await MenuItemSchema.aggregate(pipeline);

      return result;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve menu items",
      });
    }
  }

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
