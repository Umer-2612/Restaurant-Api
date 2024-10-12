import mongoose, { Schema } from "mongoose";
import { IOrderSchema } from "./interface";

const OrderSchema = new Schema(
  {
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "menuItem" },
        quantity: { type: Number },
      },
    ],
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["Paid", "Not Paid"],
      default: "Not Paid",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    customerDetails: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    paymentDetails: {
      method: { type: String },
      status: { type: String },
      paymentIntent: { type: String },
      sessionId: { type: String },
      totalAmountReceivedInCents: { type: Number },
      currency: { type: String },
      paymentStatus: { type: String },
      customerCardDetails: {
        email: { type: String },
        name: { type: String },
        phone: { type: String },
      },
    },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export default mongoose.model<IOrderSchema>("Order", OrderSchema);
