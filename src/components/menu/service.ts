import MenuDao from "./dao";
import MenuValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import { ICategorySchema, IMenuSchema } from "./interface";

class MenuService {

  public async createCategory(data: ICategorySchema): Promise<ICategorySchema> {
    const { error } = MenuValidation.validateCreateCategory.validate(data);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const category = await MenuDao.createCategory(data);
      return category;
    } catch (error) {
      throw error;
    }
  }

  public async updateCategory(id: string, data: ICategorySchema): Promise<ICategorySchema | null> {
    const { error } = MenuValidation.validateUpdateCategory.validate(data);
    const { error: idError } = MenuValidation.validateId(id);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    if (idError) {
      throw new ErrorHandler({ statusCode: 400, message: idError.message });
    }

    try {
      const category = await MenuDao.updateCategory(id, data);
      return category;
    } catch (error) {
      throw error;
    }
  }

  public async getCategories(): Promise<ICategorySchema[] | null> {
    try {
      const categories = await MenuDao.getCategories();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCategory(id: string): Promise<ICategorySchema | null> {
    const { error } = MenuValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const category = await MenuDao.deleteCategory(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  public async createMenuItem(data: IMenuSchema): Promise<IMenuSchema> {
    const { error } = MenuValidation.validateCreateMenuItem.validate(data);
    const { error: idError } = MenuValidation.validateId(data.catgory_id);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    if (idError) {
      throw new ErrorHandler({ statusCode: 400, message: idError.message });
    }

    try {
      const menu = await MenuDao.createMenuItem(data);
      return menu;
    } catch (error) {
      throw error;
    }
  }

  public async updateMenuItem(id: string, data: IMenuSchema): Promise<IMenuSchema | null> {
    const { error } = MenuValidation.validateUpdateMenuItem.validate(data);
    const { error: idError } = MenuValidation.validateId(id);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    if (idError) {
      throw new ErrorHandler({ statusCode: 400, message: idError.message });
    }

    try {
      const menu = await MenuDao.updateMenuItem(id, data);
      return menu;
    } catch (error) {
      throw error;
    }
  }

  public async getMenuItems(): Promise<IMenuSchema[] | null> {
    try {
      const menuItems = await MenuDao.getMenuItems();
      return menuItems;
    } catch (error) {
      throw error;
    }
  }

  public async deleteMenuItem(id: string): Promise<IMenuSchema | null> {
    const { error } = MenuValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const menu = await MenuDao.deleteMenuItem(id);
      return menu;
    } catch (error) {
      throw error;
    }
  }
}

export default new MenuService();
