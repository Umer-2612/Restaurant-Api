import mongoose, { Schema } from "mongoose";
import { IProblemSetSchema } from "./interface";

const problemSetSchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    tags: {
      type: [String], // Array of strings
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    status: { type: Boolean, default: false },
    practiceLink: { type: String },
    isLeetCode: { type: Boolean, default: false },
    youtubeLink: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "problemSets" }
);

export default mongoose.model<IProblemSetSchema>(
  "ProblemSet",
  problemSetSchema
);
