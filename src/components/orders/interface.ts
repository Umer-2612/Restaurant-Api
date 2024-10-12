import mongoose from "mongoose";
import { IQueryBody } from "../menu-item/interface";

type IItem = {
  menu: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
};
export interface IOrderSchema extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  items: IItem[];
  totalPrice: number;
  status: "Paid" | "Not Paid";
  orderDate: Date;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentDetails: {
    method: "";
    paymentStatus: "";
    paymentIntent: string;
    sessionId: string;
    totalAmountReceivedInCents: number;
    currency: string;
    customerDetails: {
      email: string;
      name: string;
      phone: string;
    };
  };
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderService {
  create(data: IOrderSchema): Promise<IOrderSchema>;
  getAllOrders(data: IQueryBody): Promise<any>;
}
