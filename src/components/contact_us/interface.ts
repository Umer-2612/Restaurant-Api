/**
 * Represents the structure of a contact request in the database.
 *
 * @interface IContactRequestSchema
 * @extends {Document}
 */
import { Document } from "mongoose";

export interface IContactRequestSchema extends Document {
  /**
   * First name of the contact request
   *
   * @type {string}
   * @memberof IContactRequestSchema
   */
  firstName: string;

  /**
   * Last name of the contact request
   *
   * @type {string}
   * @memberof IContactRequestSchema
   */
  lastName: string;

  /**
   * Phone number of the contact request
   *
   * @type {number}
   * @memberof IContactRequestSchema
   */
  phoneNo: number;

  /**
   * Email of the contact request
   *
   * @type {string}
   * @memberof IContactRequestSchema
   */
  email: string;

  /**
   * Message of the contact request
   *
   * @type {string}
   * @memberof IContactRequestSchema
   */
  message: string;

  /**
   * Whether the record is deleted or not
   *
   * @type {boolean}
   * @memberof IContactRequestSchema
   */
  recordDeleted: boolean;

  /**
   * Timestamp when the record was created
   *
   * @type {Date}
   * @memberof IContactRequestSchema
   */
  createdAt: Date;

  /**
   * Timestamp when the record was last updated
   *
   * @type {Date}
   * @memberof IContactRequestSchema
   */
  updatedAt: Date;
}

/**
 * Represents the pagination query object.
 *
 * @interface IPaginationBody
 * @property {number} page - The page number to retrieve.
 * @property {number} limit - The number of records to retrieve per page.
 */
export interface IPaginationBody {
  page: number;
  limit: number;
}