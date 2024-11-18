import mongoose from "mongoose";

type IItem = {
  item: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
};

export interface IGetAllOrderBody {
  id?: string;
  page?: number;
  limit?: number;
}

export interface IOrderSchema extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  items: IItem[];
  totalPrice: number;
  status: "Paid" | "Not Paid";
  payment_method: "COD" | "Online";
  orderDate: Date;
  paymentMethod: string;
  customerDetails: {
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
    customerCardDetails: {
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
  getAllOrders(data: IGetAllOrderBody): Promise<any>;
}
