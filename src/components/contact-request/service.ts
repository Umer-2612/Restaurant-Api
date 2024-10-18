import ContactRequestFormDao from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IContactRequestSchema, IPaginationBody } from "./interface";

class ContactRequestFormService {
  private contactRequestFormDao: ContactRequestFormDao;

  constructor() {
    this.contactRequestFormDao = new ContactRequestFormDao();
  }

  public async createContactRequestForm(
    data: IContactRequestSchema
  ): Promise<IContactRequestSchema> {
    try {
      const contactForm =
        await this.contactRequestFormDao.createContactRequestForm(data);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  public async updateContactRequestForm(
    id: string,
    data: IContactRequestSchema
  ): Promise<IContactRequestSchema | null> {
    try {
      const isContactFormExist =
        await this.contactRequestFormDao.getContactRequestFormById(id);

      if (!isContactFormExist) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Contact form not found for update",
        });
      }

      const contactForm =
        await this.contactRequestFormDao.updateContactRequestForm(id, data);
      if (!contactForm) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Contact form not found for update",
        });
      }

      return contactForm;
    } catch (error) {
      throw error;
    }
  }

  public async getContactRequestForm(data: IPaginationBody): Promise<any> {
    try {
      const rowLimit = data.limit ? data.limit : 10;
      const rowSkip = data.page ? (data.page - 1) * rowLimit : 0;

      const matchCondition: any = { recordDeleted: false };

      // Constructing the pipeline in the service layer
      const pipeline = [
        {
          $match: matchCondition,
        },
        {
          $facet: {
            paginationData: [
              { $count: "total" },
              {
                $addFields: {
                  currentPage: data.page > 0 ? Number(data.page) : 1,
                },
              },
            ],
            data: [
              { $sort: { createdAt: -1 } },
              { $skip: rowSkip },
              { $limit: rowLimit },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                  status: 1,
                  message: 1,
                  phoneNo: 1,
                  createdAt: 1,
                },
              },
            ],
          },
        },
      ];

      // Pass the pipeline to the DAO layer
      const contactForms =
        await this.contactRequestFormDao.getAllContactRequestForm(pipeline);

      return contactForms;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve contact request forms",
      });
    }
  }

  public async deleteContactRequestForm(
    id: string
  ): Promise<IContactRequestSchema | null> {
    try {
      const contactForm =
        await this.contactRequestFormDao.deleteContactRequestForm(id);
      return contactForm;
    } catch (error) {
      throw error;
    }
  }
}

export default ContactRequestFormService;
