import UserDAO from "./dao";
import UserValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import { IUserSchema } from "./interface";

class UserService {
  public async getUserById(id: string): Promise<IUserSchema | null> {
    const { error } = UserValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const user = await UserDAO.getUser({ _id: id });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
