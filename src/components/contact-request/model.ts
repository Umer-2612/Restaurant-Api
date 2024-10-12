import mongoose, { Schema } from "mongoose";
import { IContactRequestSchema } from "./interface";

const ContactRequestSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    message: { type: String },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "contactRequests",
  }
);

export default mongoose.model<IContactRequestSchema>(
  "ContactRequest",
  ContactRequestSchema
);
