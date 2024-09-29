import UserSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IUserSchema } from "./interface";

export default class UserDAO {
  public static async createUser(data: IUserSchema): Promise<IUserSchema> {
    try {
      const user = await UserSchema.create(data);
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async getUser(
    params: { _id?: string; email?: string },
    fields?: string[]
  ): Promise<IUserSchema | null> {
    try {
      const { _id, email } = params;
      const query: any = { recordDeleted: false };

      if (_id) {
        query._id = _id;
      } else if (email) {
        query.email = email;
      }

      // Convert the fields array into a space-separated string
      const projection: string = fields ? fields.join(" ") : "";
      const user = await UserSchema.findOne(query).select(projection);

      return user;
    } catch (error) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}
