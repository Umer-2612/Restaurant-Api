import { Document } from "mongoose";

export interface IOrderSchema extends Document {
  items: Array<any>;
  totalPrice: number;
  status: string;
  orderDate: Date;
  orderdName: string;
  orderdEmail: string;
  paymentMethod: string;
  paymentStatus: string;
}

export interface IPaginationBody {
  page: number;
  limit: number;
}
