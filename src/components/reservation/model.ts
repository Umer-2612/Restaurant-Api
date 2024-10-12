import mongoose, { Schema } from "mongoose";
import { IReservationRequestSchema } from "./interface";

const ReservationRequestsSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    noOfPeople: { type: Number },
    reservationDate: { type: Date },
    message: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "reservations",
  }
);

export default mongoose.model<IReservationRequestSchema>(
  "Reservation",
  ReservationRequestsSchema
);
