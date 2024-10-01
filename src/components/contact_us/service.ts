import ContactRequestsDAO from "./dao";
import ContactRequestsValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema } from "./interface";

class ContactRequestFormService {

  public async createContactRequestForm(data: IContactRequestSchema): Promise<IContactRequestSchema> {
    const { error } = ContactRequestsValidation.validateCreateContactRequestForm.validate(data);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const contactForm = await ContactRequestsDAO.createContactRequestForm(data);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  public async updateContactRequestForm(id: string, data: IContactRequestSchema): Promise<IContactRequestSchema | null> {
    const { error } = ContactRequestsValidation.validateUpdateContactRequestForm.validate(data);
    const { error: idError } = ContactRequestsValidation.validateId(id);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    if (idError) {
      throw new ErrorHandler({ statusCode: 400, message: idError.message });
    }

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
    const { error } = ContactRequestsValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const contactForm = await ContactRequestsDAO.deleteContactRequestForm(id);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactRequestFormService();
