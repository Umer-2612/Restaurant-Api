import { Document } from "mongoose";

export interface IReservationRequestSchema extends Document {
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  noOfPeople: number;
  date_of_reservation: Date;
  message: string;
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
