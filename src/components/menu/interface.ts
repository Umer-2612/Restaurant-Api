import { Document } from "mongoose";

export interface ICategorySchema extends Document {
  category_name: string;
  category_description: string;
  is_enabled: boolean;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenuSchema extends Document {
  item_name: string;
  catgory_id: string;
  item_description: string;
  item_price: number;
  is_enabled: boolean
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  createdAt: Date;
  updatedAt: Date;
}
