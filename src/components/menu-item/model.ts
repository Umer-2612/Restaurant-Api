/**
 * Mongoose schema for the menu item model.
 *
 * @typedef {import('mongoose').Document & {
 *   itemName: string,
 *   category: import('mongoose').Schema.Types.ObjectId,
 *   itemDescription: string,
 *   itemPrice: number,
 *   recordDeleted: boolean,
 *   createdBy: import('mongoose').Schema.Types.ObjectId,
 *   updatedBy: import('mongoose').Schema.Types.ObjectId,
 * }} IMenuItemSchema
 */
import mongoose, { Schema } from "mongoose";
import { IMenuItemSchema } from "./interface";

/**
 * Mongoose schema for the menu item model.
 *
 * @type {Schema<IMenuItemSchema, import('mongoose').Model<IMenuItemSchema, Record<string, unknown>, IMenuItemSchema>, IMenuItemSchema>}
 */
const MenuItemSchema: Schema = new Schema(
  {
    /**
     * Name of the menu item.
     *
     * @type {string}
     */
    itemName: { type: String },

    /**
     * Category of the menu item.
     *
     * @type {import('mongoose').Schema.Types.ObjectId}
     */
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    /**
     * Description of the menu item.
     *
     * @type {string}
     */
    itemDescription: { type: String },

    /**
     * Price of the menu item.
     *
     * @type {number}
     */
    itemPrice: { type: Number },

    /**
     * Flag indicating whether the menu item has been deleted.
     *
     * @type {boolean}
     */
    recordDeleted: { type: Boolean, default: false },

    /**
     * User who created the menu item.
     *
     * @type {import('mongoose').Schema.Types.ObjectId}
     */
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    /**
     * User who last updated the menu item.
     *
     * @type {import('mongoose').Schema.Types.ObjectId}
     */
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