import mongoose, { Schema } from "mongoose";
import { IMenuItemSchema } from "./interface";

/**
 * @constant MenuItemSchema
 * @type {Schema}
 * @description Mongoose schema for the menu item model.
 * This schema defines the structure of a  menu item document in the database.
 */
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
    collection: "menu",
  }
);

/**
 * Mongoose model for the menu item schema.
 *
 * @type {import('mongoose').Model<IMenuItemSchema, Record<string, unknown>, IMenuItemSchema>}
 */
export default mongoose.model<IMenuItemSchema>("Menu", MenuItemSchema);
