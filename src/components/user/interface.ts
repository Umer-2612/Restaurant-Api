import { Document } from "mongoose";

export interface IUserSchema extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  password: string;
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
