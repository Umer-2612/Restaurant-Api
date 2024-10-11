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
      enum: ["Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    payment: {
      method: { type: String },
      status: { type: String },
      paymentIntent: { type: String },
      sessionId: { type: String },
      totalAmountReceivedInCents: { type: Number },
      currency: { type: String },
      paymentStatus: { type: String },
    },
    customerDetails: {
      email: { type: String },
      name: { type: String },
      phone: { type: String },
    },
    paymentOutcome: {
      networkStatus: { type: String },
      riskLevel: { type: String },
      sellerMessage: { type: String },
    },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export default mongoose.model<IOrderSchema>("Order", OrderSchema);
