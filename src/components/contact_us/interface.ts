import { Document } from "mongoose";

export interface IContactRequestSchema extends Document {
  first_name: string;
  last_name: string;
  phone_no: number;
  email: string;
  message: string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
