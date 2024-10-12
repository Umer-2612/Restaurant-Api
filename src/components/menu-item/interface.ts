import mongoose, { Document } from "mongoose";

export interface IMenuItemSchema extends Document {
  itemName: string;
  category: mongoose.Schema.Types.ObjectId | string;
  itemDescription?: string;
  itemPrice: number;
  itemImagePath: string;
  recordDeleted: boolean;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaginationBody {
  page: number;
  limit: number;
}

export interface IQueryBody {
  page: number;
  limit: number;
  category: string;
}

/**
 * @interface IMenuItemService
 * @description Interface defining the menu item service methods for managing menu.
 */
export interface IMenuItemService {
  createMenuItem(data: IMenuItemSchema): Promise<IMenuItemSchema>;
  getAllMenuItems(data: IPaginationBody): Promise<any>;
  getMenuItemById(id: string): Promise<IMenuItemSchema>;
  updateMenuItem(
    id: string,
    data: Partial<IMenuItemSchema>
  ): Promise<IMenuItemSchema>;
  deleteMenuItem(id: string): Promise<void>;
}
