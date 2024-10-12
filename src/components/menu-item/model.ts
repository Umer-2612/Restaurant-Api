import mongoose, { Schema } from "mongoose";
import { IMenuItemSchema } from "./interface";

const MenuItemSchema: Schema = new Schema(
  {
    itemName: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    itemDescription: { type: String },
    itemPrice: { type: Number },
    itemImagePath: { type: String },
    recordDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "menuItem",
  }
);

export default mongoose.model<IMenuItemSchema>("menuItem", MenuItemSchema);
