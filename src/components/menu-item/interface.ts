import mongoose, { Document } from "mongoose";

/**
 * @interface IMenuItemSchema
 * @extends Document
 * @description Represents the structure of a menu item in the database.
 */
export interface IMenuItemSchema extends Document {
  /**
   * @property {string} itemName
   * @description The name of the menu item. This field is required.
   */
  itemName: string;

  /**
   * @property {mongoose.Schema.Types.ObjectId | string} category
   * @description The ObjectId referencing the Category collection, indicating the category this menu item belongs to.
   */
  category: mongoose.Schema.Types.ObjectId | string;

  /**
   * @property {string} [itemDescription]
   * @description A description of the menu item. This field is optional.
   */
  itemDescription?: string;

  /**
   * @property {number} itemPrice
   * @description The price of the menu item. This field is required.
   */
  itemPrice: number;

  /**
   * @property {boolean} recordDeleted
   * @description Indicates whether the item has been soft deleted. Default value is false.
   */
  recordDeleted: boolean;

  /**
   * @property {mongoose.Schema.Types.ObjectId} createdBy
   * @description The ObjectId referencing the User collection, indicating which user created the menu item.
   */
  createdBy: mongoose.Schema.Types.ObjectId;

  /**
   * @property {mongoose.Schema.Types.ObjectId} updatedBy
   * @description The ObjectId referencing the User collection, indicating which user last updated the menu item.
   */
  updatedBy: mongoose.Schema.Types.ObjectId;

  /**
   * @property {Date} createdAt
   * @description The timestamp indicating when the item was created. Managed by Mongoose.
   */
  createdAt: Date;

  /**
   * @property {Date} updatedAt
   * @description The timestamp indicating when the item was last updated. Managed by Mongoose.
   */
  updatedAt: Date;
}

/**
 * @interface IMenuItemService
 * @description Interface defining the menu item service methods for managing menu.
 */
export interface IMenuItemService {
  /**
   * @method createMenuItem
   * @param {IMenuItemSchema} data - The menu item data to create.
   * @returns {Promise<IMenuItemSchema>} The created menu item.
   */
  createMenuItem(data: IMenuItemSchema): Promise<IMenuItemSchema>;
  getMenuItems(): Promise<IMenuItemSchema[]>;
  getMenuItemById(id: string): Promise<IMenuItemSchema>;
  updateMenuItem(id: string, data: Partial<IMenuItemSchema>): Promise<IMenuItemSchema>;
  deleteMenuItem(id: string): Promise<void>;
}
