import mongoose, { Schema } from "mongoose";
import { IReservationRequestSchema } from "./interface";

const ReservationRequestsSchema: Schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    phone_no: { type: Number },
    email: { type: String },
    no_of_people: { type: Number },
    date_of_reservation: { type: Date },
    message: { type: String },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "reservation_requests",
  }
);

export default mongoose.model<IReservationRequestSchema>("ReservationRequests", ReservationRequestsSchema);
