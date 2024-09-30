import mongoose, { Schema } from "mongoose";
import { IContactRequestSchema } from "./interface";

const ContactRequestSchema: Schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    phone_no: { type: Number },
    email: { type: String },
    message: { type: String },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "contact_requests",
  }
);

export default mongoose.model<IContactRequestSchema>("ContactRequests", ContactRequestSchema);
