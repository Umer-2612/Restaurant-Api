import mongoose, { Schema } from "mongoose";
import { IReservationRequestSchema } from "./interface";

const ReservationRequestsSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    noOfPeople: { type: Number },
    date_of_reservation: { type: Date },
    message: { type: String },
    recordDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "reservation_request",
  }
);

export default mongoose.model<IReservationRequestSchema>(
  "ReservationRequest",
  ReservationRequestsSchema
);
