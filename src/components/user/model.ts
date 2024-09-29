import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "./interface";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    profile: { type: String },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { recordDeleted: { $eq: false } } }
);

// Pre-save middleware for hashing the password and any other operations
UserSchema.pre<IUserSchema>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    try {
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      next();
    } catch (error: any) {
      next(error);
    }
  }
});

export default mongoose.model<IUserSchema>("User", UserSchema);
