import ContactRequestsDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema } from "./interface";

export default class ContactRequestFormService {

  public async createContactRequestForm(data: IContactRequestSchema): Promise<IContactRequestSchema> {
    try {
      const contactForm = await ContactRequestsDAO.createContactRequestForm(data);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  public async updateContactRequestForm(id: string, data: IContactRequestSchema): Promise<IContactRequestSchema | null> {
    try {
      const contactForm = await ContactRequestsDAO.updateContactRequestForm(id, data);
      if(!contactForm) {
        throw new ErrorHandler({ statusCode: 404, message: "Contact form not found for update" });
      }
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  public async getContactRequestForm(): Promise<IContactRequestSchema[] | null> {
    try {
      const contactForms = await ContactRequestsDAO.getContactRequestForm();
      return contactForms;
    } catch (error) {
      throw error;
    }
  }

  public async deleteContactRequestForm(id: string): Promise<IContactRequestSchema | null> {
    try {
      const contactForm = await ContactRequestsDAO.deleteContactRequestForm(id);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }
}
