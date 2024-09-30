import { Document } from "mongoose";

export interface IReservationRequestSchema extends Document {
  first_name: string;
  last_name: string;
  phone_no: number;
  email: string;
  no_of_people: number;
  date_of_reservation: Date;
  message: string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
