/**
 * Mongoose schema for the contact request model.
 *
 * @typedef {import('mongoose').Document & {
 *   firstName: string,
 *   lastName: string,
 *   phoneNo: number,
 *   email: string,
 *   message: string,
 *   recordDeleted: boolean
 * }} IContactRequestSchema
 */
import mongoose, { Schema } from "mongoose";
import { IContactRequestSchema } from "./interface";

/**
 * Mongoose schema for the contact request model.
 *
 * @type {Schema<IContactRequestSchema, import('mongoose').Model<IContactRequestSchema, Record<string, unknown>>, IContactRequestSchema>}
 */
const ContactRequestSchema: Schema = new Schema(
  {
    /**
     * First name of the person making the contact request.
     *
     * @type {string}
     */
    firstName: { type: String },

    /**
     * Last name of the person making the contact request.
     *
     * @type {string}
     */
    lastName: { type: String },

    /**
     * Phone number of the person making the contact request.
     *
     * @type {number}
     */
    phoneNo: { type: Number },

    /**
     * Email address of the person making the contact request.
     *
     * @type {string}
     */
    email: { type: String },

    /**
     * Message from the person making the contact request.
     *
     * @type {string}
     */
    message: { type: String },

    /**
     * Flag indicating whether the contact request has been deleted.
     *
     * @type {boolean}
     */
    recordDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: "contact_request"
  }
);

/**
 * Mongoose model for the contact request schema.
 *
 * @type {import('mongoose').Model<IContactRequestSchema, Record<string, unknown>, IContactRequestSchema>}
 */
export default mongoose.model<IContactRequestSchema>("ContactRequest", ContactRequestSchema);