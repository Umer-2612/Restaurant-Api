import { Document } from "mongoose";

export interface IReservationRequestSchema extends Document {
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  noOfPeople: number;
  reservationDate: Date;
  message: string;
  status: string;
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  actual_date?: string;
  actual_time?: string;
}

export interface IPaginationBody {
  page: number;
  limit: number;
}
