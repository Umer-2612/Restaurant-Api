import mongoose from "mongoose";

type IItem = {
  menu: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
};
export interface IOrderSchema extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  items: IItem[];
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Delivered" | "Cancelled";
  orderDate: Date;
  payment: {
    method: "";
    paymentStatus: "";
    paymentIntent: string;
    sessionId: string;
    totalAmountReceivedInCents: number;
    currency: string;
  };
  customerDetails: {
    email: string;
    name: string;
    phone: string;
  };
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderService {
  create(data: IOrderSchema): Promise<IOrderSchema>;
}
