import CategorySchema from "./categoryModel";
import MenuSchema from "./menuModel";
import { ErrorHandler } from "../../utils/common-function";
import { ICategorySchema, IMenuSchema } from "./interface";

export default class MenuDAO {

  public static async createCategory(data: ICategorySchema): Promise<ICategorySchema> {
    try {
      const category = await CategorySchema.create(data);
      return category;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({ statusCode: 409, message: `${field} already exists.`, });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async updateCategory(id: string, data: ICategorySchema): Promise<ICategorySchema | null> {
    try {
      const updateCategory = await CategorySchema.findByIdAndUpdate(id, data, { new: true });

      return updateCategory;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async getCategories(): Promise<ICategorySchema[] | null> {
    try {
      const query: any = { is_deleted: false, is_enabled: true };
      let getCategories = await CategorySchema.find(query);
      return getCategories;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async deleteCategory(id: string): Promise<ICategorySchema | null> {
    try {
      const query = { is_deleted: true };
      const deleteCategory = await CategorySchema.findByIdAndUpdate(id, query, { new: true });
      return deleteCategory;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async createMenuItem(data: IMenuSchema): Promise<IMenuSchema> {
    try {
      const menu = await MenuSchema.create(data);
      return menu;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({ statusCode: 409, message: `${field} already exists.`, });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async updateMenuItem(id: string, data: IMenuSchema): Promise<IMenuSchema | null> {
    try {
      const updateMenuItem = await MenuSchema.findByIdAndUpdate(id, data, { new: true });

      return updateMenuItem;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async getMenuItems(): Promise<IMenuSchema[] | null> {
    try {
      const query: any = { is_deleted: false, is_enabled: true };
      let join = { path: "catgory_id", select: "category_name", match: query };
      let getMenuItemsByCategory = await MenuSchema.find(query).populate(join);
      return getMenuItemsByCategory;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async deleteMenuItem(id: string): Promise<IMenuSchema | null> {
    try {
      const query = { is_deleted: true };
      const deleteMenuItem = await MenuSchema.findByIdAndUpdate(id, query, { new: true });
      return deleteMenuItem;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}