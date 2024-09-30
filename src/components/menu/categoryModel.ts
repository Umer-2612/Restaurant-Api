import mongoose, { Schema } from "mongoose";
import { ICategorySchema } from "./interface";

const CategorySchema: Schema = new Schema(
  {
    category_name: { type: String },
    category_description: { type: String },
    is_enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: String, default: "admin" },
    updated_by: { type: String, default: "admin" },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

export default mongoose.model<ICategorySchema>("Categories", CategorySchema);
