import mongoose, { Schema } from "mongoose";
import { IOrderSchema } from "./interface";

const OrderSchema: Schema = new Schema(
  {
    items: { type: Array },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Preparing', 'Delivered', 'Cancelled'], default: 'Pending', },
    orderDate: { type: Date, default: Date.now },
    orderdName: { type: String },
    orderdEmail: { type: String },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'Online'], required: true, },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending', },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export default mongoose.model<IOrderSchema>(
  "Order",
  OrderSchema
);
