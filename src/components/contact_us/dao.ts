import ContactRequestSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema } from "./interface";

export default class ContactRequestsDAO {

  public static async createContactRequestForm(data: IContactRequestSchema): Promise<IContactRequestSchema> {
    try {
      const contactForm = await ContactRequestSchema.create(data);
      return contactForm;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({ statusCode: 409, message: `${field} already exists.`, });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async updateContactRequestForm(id: string, data: IContactRequestSchema): Promise<IContactRequestSchema | null> {
    try {
      const contactFrom = await ContactRequestSchema.findByIdAndUpdate(id, data, { new: true });

      return contactFrom;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async getContactRequestForm(): Promise<IContactRequestSchema[] | null> {
    try {
      const query: any = { is_deleted: false };
      let getContactForms = await ContactRequestSchema.find(query);
      return getContactForms;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async deleteContactRequestForm(id: string): Promise<IContactRequestSchema | null> {
    try {
      const query = { is_deleted: true };
      const deleteContactRequestForm = await ContactRequestSchema.findByIdAndUpdate(id, query, { new: true });
      return deleteContactRequestForm;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}