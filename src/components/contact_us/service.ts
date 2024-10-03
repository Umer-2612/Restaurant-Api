/**
 * Service class for contact request form operations.
 *
 * @class ContactRequestFormService
 * @author Neel Rana <neelranga@gmail.com>
 * @since 2024-10-01
 */
import ContactRequestsDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema, IPaginationBody } from "./interface";

export default class ContactRequestFormService {

  /**
   * Creates a new contact request form.
   *
   * @method createContactRequestForm
   * @param {IContactRequestSchema} data - contact request form data.
   * @returns {Promise<IContactRequestSchema>} newly created contact request form.
   * @throws {ErrorHandler} if error occurs while creating contact request form.
   */
  public async createContactRequestForm(data: IContactRequestSchema): Promise<IContactRequestSchema> {
    try {
      const contactForm = await ContactRequestsDAO.createContactRequestForm(data);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates an existing contact request form.
   *
   * @method updateContactRequestForm
   * @param {string} id - id of the contact request form to be updated.
   * @param {IContactRequestSchema} data - contact request form data.
   * @returns {Promise<IContactRequestSchema | null>} updated contact request form.
   * @throws {ErrorHandler} if error occurs while updating contact request form.
   */
  public async updateContactRequestForm(id: string, data: IContactRequestSchema): Promise<IContactRequestSchema | null> {
    try {
      const contactForm = await ContactRequestsDAO.updateContactRequestForm(id, data);
      if (!contactForm) {
        throw new ErrorHandler({ statusCode: 404, message: "Contact form not found for update" });
      }
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets all contact request forms.
   *
   * @method getContactRequestForm
   * @returns {Promise<{data: IContactRequestSchema[] | null, totalCount: number}>} list of all contact request forms.
   * @throws {ErrorHandler} if error occurs while getting contact request forms.
   */
  public async getContactRequestForm(data: IPaginationBody): Promise<{ data: IContactRequestSchema[] | null, totalCount: number }> {
    try {
      const contactForms = await ContactRequestsDAO.getContactRequestForm(data);
      return contactForms;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a contact request form.
   *
   * @method deleteContactRequestForm
   * @param {string} id - id of the contact request form to be deleted.
   * @returns {Promise<IContactRequestSchema | null>} deleted contact request form.
   * @throws {ErrorHandler} if error occurs while deleting contact request form.
   */
  public async deleteContactRequestForm(id: string): Promise<IContactRequestSchema | null> {
    try {
      const contactForm = await ContactRequestsDAO.deleteContactRequestForm(id);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }
}