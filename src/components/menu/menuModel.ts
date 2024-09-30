import mongoose, { Schema } from "mongoose";
import { IMenuSchema } from "./interface";

const MenuSchema: Schema = new Schema(
  {
    item_name: { type: String },
    catgory_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    item_description: { type: String },
    item_price: { type: Number },
    is_enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: String, default: "admin" },
    updated_by: { type: String, default: "admin" },
  },
  {
    timestamps: true,
    collection: "menus",
  }
);

export default mongoose.model<IMenuSchema>("Menus", MenuSchema);
