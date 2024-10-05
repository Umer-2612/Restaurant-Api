import * as bcrypt from "bcrypt";
import { ErrorHandler } from "../../utils/common-function";
import { IUserSchema } from "../user/interface";
import UserValidation from "../user/validation";
import UserSchema from "../user/model";
import AuthValidation from "./validation";
import { IAuthService, ISignBody } from "./interface";

class AuthService implements IAuthService {
  public async signUp(data: IUserSchema): Promise<IUserSchema> {
    const { error } = UserValidation.createUserSchema.validate(data);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const user = new UserSchema(data);
      await user.save();

      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }
  public async signIn(data: ISignBody): Promise<IUserSchema | null> {
    const { error } = AuthValidation.signInBody.validate(data);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
    try {
      // Find the user by email
      const user: IUserSchema | null = await UserSchema.findOne({
        email: data.email,
      });

      if (!user) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new ErrorHandler({
          statusCode: 401,
          message: "Invalid credentials",
        });
      }

      const userObj = JSON.parse(JSON.stringify(user));
      delete userObj.password;

      return userObj;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async saveToken(email: string, token: string) {
    let existedUser = await UserSchema.findOne({ email: email });

    if (!existedUser) {
      throw new ErrorHandler({ statusCode: 404, message: "User not found" })
    }

    if (!token) {
      throw new ErrorHandler({ statusCode: 400, message: "Token not found" })
    }

    try {
      await UserSchema.findOneAndUpdate({ email: email }, { token: token });
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async signOut(email: string) {
    let existedUser = await UserSchema.findOne({ email: email });

    if (!existedUser) {
      throw new ErrorHandler({ statusCode: 404, message: "User not found" })
    }

    try {
      await UserSchema.findOneAndUpdate({ email: email }, { token: "" });
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }
}

export default new AuthService();
