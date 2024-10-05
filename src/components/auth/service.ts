import * as bcrypt from "bcrypt";
import { ErrorHandler, sendOtp, decrypt } from "../../utils/common-function";
import { IUserSchema } from "../user/interface";
import UserValidation from "../user/validation";
import UserSchema from "../user/model";
import AuthValidation from "./validation";
import { IAuthService, ISignBody, IForgotPassword, IResetPassword, IUpdateProfile, IChangePassword } from "./interface";

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
  };

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
  };

  public async signOut(email: string): Promise<IUserSchema | null> {
    const { error } = AuthValidation.signOutBody.validate({ email });
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    let existedUser = await UserSchema.findOne({ email: email });

    if (!existedUser) {
      throw new ErrorHandler({ statusCode: 404, message: "User not found" })
    }

    try {
      await UserSchema.findOneAndUpdate({ email: email }, { token: "" });
      let updatedUser = await UserSchema.findOne({ email: email });
      if (!updatedUser) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      return updatedUser;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  };

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
  };

  public async updateProfile(email: string, data: IUpdateProfile): Promise<IUserSchema> {
    const { error } = AuthValidation.updateProfileBody.validate(data);
    if (error) {
      console.log(error);
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
    const { userName } = data;
    try {
      const user = await UserSchema.findOne({ email: email });
      if (!user) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      await UserSchema.findOneAndUpdate({ email: email }, { userName: userName });
      let updatedUser = await UserSchema.findOne({ email: email });
      if (!updatedUser) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      return updatedUser;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  };

  public async changePassword(email: string, data: IChangePassword): Promise<IUserSchema> {
    const { error } = AuthValidation.changePasswordBody.validate(data);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      let userDetails = await UserSchema.findOne({ email: email });
      if (!userDetails) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      if (!data.newPassword) {
        throw new ErrorHandler({ statusCode: 400, message: "New password is required" });
      }

      if (!data.confirmPassword) {
        throw new ErrorHandler({ statusCode: 400, message: "Conform password is required" });
      }
      const checkPassword = await bcrypt.compareSync(data.password, userDetails.password);
      if (!checkPassword) {
        throw new ErrorHandler({
          statusCode: 401,
          message: "Invalid credentials",
        });
      }

      if (data.newPassword !== data.confirmPassword) {
        throw new ErrorHandler({ statusCode: 400, message: "Passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.newPassword, salt);
      await UserSchema.findOneAndUpdate({ email: email }, { password: hashedPassword });
      let updatedUser = await UserSchema.findOne({ email: email });
      if (!updatedUser) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      return updatedUser;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  };

  public async forgotPassword(data: IForgotPassword): Promise<any> {
    const { error } = AuthValidation.forgotPasswordBody.validate(data);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    const { email } = data;
    try {
      const user = await UserSchema.findOne({ email: email });
      if (!user) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      let sendOtpAtEmail = await sendOtp(user.userName, email, otp);
      if (!sendOtpAtEmail) {
        throw new ErrorHandler({ statusCode: 400, message: "Email not sent" });
      } else {
        return sendOtpAtEmail;
      }
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  };

  public async resetPassword(data: IResetPassword): Promise<IUserSchema> {
    const { error } = AuthValidation.resetPasswordBody.validate(data);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    const { encryptedEmail, otp, password, confirmPassword } = data;
    try {
      let email = decrypt(encryptedEmail);
      if (!email) {
        throw new ErrorHandler({ statusCode: 400, message: "Invalid email" });
      }
      let correctEmail = JSON.parse(email);
      const user = await UserSchema.findOne({ email: correctEmail });
      if (!user) {
        throw new ErrorHandler({ statusCode: 404, message: "User not found" });
      }
      let userOtp = decrypt(user.otp.toString());
      userOtp = parseInt(userOtp);

      if (otp !== userOtp) {
        throw new ErrorHandler({ statusCode: 400, message: "Invalid OTP" });
      }
      let currentDate = new Date();
      if (user.otpExpiry < currentDate) {
        throw new ErrorHandler({ statusCode: 400, message: "OTP expired, please request a new OTP" });
      }

      if (password !== confirmPassword) {
        throw new ErrorHandler({ statusCode: 400, message: "Passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await UserSchema.findOneAndUpdate({ email: correctEmail }, { password: hashedPassword, otp: null, otpExpiry: null });
      return user;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  };
}

export default new AuthService();
