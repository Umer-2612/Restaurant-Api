import ContactRequestSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema, IPaginationBody } from "./interface";

export default class ContactRequestsDAO {
  public async getAllContactRequestForm(pipeline: any): Promise<any> {
    try {
      const result = await ContactRequestSchema.aggregate(pipeline);

      return result;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve contact request forms",
      });
    }
  }

  public async getContactRequestFormById(
    id: string
  ): Promise<IContactRequestSchema | null> {
    try {
      const res = await ContactRequestSchema.findOne({
        _id: id,
        recordDeleted: false,
      });
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve contact form",
      });
    }
  }

  public async createContactRequestForm(
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

  public async updateContactRequestForm(
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

  public async deleteContactRequestForm(
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
