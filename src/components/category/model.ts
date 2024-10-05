import mongoose, { Schema } from "mongoose";
import { ICategorySchema } from "./interface";

/**
 * @constant CategorySchema
 * @type {Schema}
 * @description Mongoose schema for the category model.
 * This schema defines the structure of a category document in the database.
 */
const CategorySchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String },
    recordDeleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
    collection: "category", // Specifies the collection name in the database
  }
);

/**
 * Creates a unique index on the name field, ensuring that the name is unique
 * for non-deleted records (recordDeleted: false).
 */
CategorySchema.index(
  { name: 1, recordDeleted: 1 },
  { unique: true, partialFilterExpression: { recordDeleted: false } }
);

/**
 * @function
 * @returns {mongoose.Model<ICategorySchema>} The Mongoose model for the Category schema.
 * @description Exports the Category model for use in other parts of the application.
 */
export default mongoose.model<ICategorySchema>("Category", CategorySchema);
