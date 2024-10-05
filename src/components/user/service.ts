import UserDAO from "./dao";
import UserValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import { IUserSchema } from "./interface";

class UserService {
  private userDao: UserDAO;

  constructor() {
    this.userDao = new UserDAO();
  }

  async createCategory(data: IUserSchema): Promise<IUserSchema> {
    try {
      return await this.userDao.createUser(data);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to create category",
      });
    }
  }

  async getUserById(id: string): Promise<IUserSchema | null> {
    const { error } = UserValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const user = await this.userDao.getUser(id);

      if (!user) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found." });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
