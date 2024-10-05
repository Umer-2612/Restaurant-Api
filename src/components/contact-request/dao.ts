/**
 * Data Access Object for Contact Request
 * @class ContactRequestsDAO
 * @author Neel Rana
 * @since 2024-10-01
 */
import ContactRequestSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema, IPaginationBody } from "./interface";

export default class ContactRequestsDAO {
  /**
   * Creates a new Contact Request Form
   * @method createContactRequestForm
   * @param {IContactRequestSchema} data contact request form data
   * @returns {Promise<IContactRequestSchema>} newly created contact request form
   * @throws {ErrorHandler} if error occurs while creating contact request form
   */
  public static async createContactRequestForm(
    data: IContactRequestSchema
  ): Promise<IContactRequestSchema> {
    try {
      const contactForm = await ContactRequestSchema.create(data);
      return contactForm;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  /**
   * Updates an existing Contact Request Form
   * @method updateContactRequestForm
   * @param {string} id id of the contact request form to be updated
   * @param {IContactRequestSchema} data contact request form data
   * @returns {Promise<IContactRequestSchema | null>} updated contact request form
   * @throws {ErrorHandler} if error occurs while updating contact request form
   */
  public static async updateContactRequestForm(
    id: string,
    data: IContactRequestSchema
  ): Promise<IContactRequestSchema | null> {
    try {
      const contactFrom = await ContactRequestSchema.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );

      return contactFrom;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  /**
   * Gets all Contact Request Forms
   * @method getContactRequestForm
   * @returns {Promise<{data: IContactRequestSchema[] | null, totalCount: number}>} list of all contact request forms
   * @throws {ErrorHandler} if error occurs while getting contact request forms
   */
  public static async getContactRequestForm(
    pipeline: any
  ): Promise<{ data: IContactRequestSchema[]; totalCount: number }> {
    try {
      const result = await ContactRequestSchema.aggregate(pipeline);

      if (result.length === 0) {
        return { data: [], totalCount: 0 };
      }

      const contactForms = result[0].data || [];
      const totalCount = result[0].paginationData.length
        ? result[0].paginationData[0].total
        : 0;

      return { data: contactForms, totalCount: totalCount };
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve contact request forms",
      });
    }
  }

  /**
   * Deletes a Contact Request Form
   * @method deleteContactRequestForm
   * @param {string} id id of the contact request form to be deleted
   * @returns {Promise<IContactRequestSchema | null>} deleted contact request form
   * @throws {ErrorHandler} if error occurs while deleting contact request form
   */
  public static async deleteContactRequestForm(
    id: string
  ): Promise<IContactRequestSchema | null> {
    try {
      const query = { recordDeleted: true };
      const deleteContactRequestForm =
        await ContactRequestSchema.findByIdAndUpdate(id, query, { new: true });
      return deleteContactRequestForm;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}
