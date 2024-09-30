import mongoose, { Schema } from "mongoose";
import { IMenuItemSchema } from "./interface";

const MenuItemSchema: Schema = new Schema(
  {
    itemName: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    itemDescription: { type: String },
    itemPrice: { type: Number },
    recordDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "menu",
  }
);

export default mongoose.model<IMenuItemSchema>("Menu", MenuItemSchema);
