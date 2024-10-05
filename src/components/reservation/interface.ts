import { Document } from "mongoose";

export interface IReservationRequestSchema extends Document {
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  noOfPeople: number;
  reservationDate: Date;
  message: string;
  recordDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  actual_date?: string;
  actual_time?: string;
}

/**
 * Represents the body of a pagination query.
 *
 * @interface IPaginationBody
 * @property {number} page - The page number to retrieve.
 * @property {number} limit - The number of records to retrieve per page.
 */
export interface IPaginationBody {
  page: number;
  limit: number;
}
