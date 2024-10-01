import { Document } from "mongoose";

export interface IContactRequestSchema extends Document {
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  message: string;
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
