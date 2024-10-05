import { Request } from "express";
import { IUserSchema } from "../user/interface";

export interface ISignBody {
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user?: IUserSchema;
}

export interface IUpdateProfile {
  email: string;
  userName: string;
}

export interface IChangePassword {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
  otp: string;
  encryptedEmail: string;
}

export interface IAuthService {
  signUp(data: IUserSchema): Promise<IUserSchema>;

  signIn(data: ISignBody): Promise<IUserSchema | null>;

  signOut(email: string): Promise<IUserSchema | null>;

  updateProfile(email: string, data: IUpdateProfile): Promise<IUserSchema>;

  changePassword(email: string, data: IChangePassword): Promise<IUserSchema>;

  forgotPassword(data: IForgotPassword): Promise<any>;

  resetPassword(data: IResetPassword): Promise<IUserSchema>;
}
