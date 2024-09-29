import { Request } from "express";
import { IUserSchema } from "../user/interface";

export interface ISignBody {
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user?: IUserSchema;
}

export interface IAuthService {
  signUp(data: IUserSchema): Promise<IUserSchema>;

  signIn(data: ISignBody): Promise<IUserSchema | null>;
}
