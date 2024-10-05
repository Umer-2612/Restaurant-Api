/**
 * Represents the structure of a reservation request in the database.
 *
 * @interface IReservationRequestSchema
 * @extends {Document}
 */
import { Document } from "mongoose";

export interface IReservationRequestSchema extends Document {
  /**
   * First name of the person making the reservation.
   */
  readonly firstName: string;

  /**
   * Last name of the person making the reservation.
   */
  readonly lastName: string;

  /**
   * Phone number of the person making the reservation.
   */
  readonly phoneNo: number;

  /**
   * Email address of the person making the reservation.
   */
  readonly email: string;

  /**
   * Number of people in the reservation.
   */
  readonly noOfPeople: number;

  /**
   * Date of the reservation.
   */
  readonly date_of_reservation: Date;

  /**
   * Message from the person making the reservation.
   */
  readonly message: string;

  /**
   * Indicates if the reservation has been deleted.
   */
  readonly recordDeleted: boolean;

  /**
   * Timestamp when the reservation was created.
   */
  readonly createdAt: Date;

  /**
   * Timestamp when the reservation was last updated.
   */
  readonly updatedAt: Date;
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