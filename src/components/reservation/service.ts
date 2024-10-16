import ReservationRequestsDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema, IPaginationBody } from "./interface";
import NodeMailerService from "../../config/node-mailer/service";
import ReservationRequestFormUtils from "./utils";

export default class ReservationRequestFormService {
  private reservationRequestDao: ReservationRequestsDAO;
  private reservationRequestUtils: ReservationRequestFormUtils;

  constructor() {
    this.reservationRequestDao = new ReservationRequestsDAO();
    this.reservationRequestUtils = new ReservationRequestFormUtils();
  }

  public async createReservationRequestForm(
    data: IReservationRequestSchema
  ): Promise<IReservationRequestSchema> {
    try {
      const reservationForm =
        await this.reservationRequestDao.createReservationRequestForm(data);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }

  public async updateReservationRequestForm(
    id: string,
    data: IReservationRequestSchema
  ): Promise<IReservationRequestSchema | null> {
    try {
      const isReservationExist =
        await this.reservationRequestDao.getReservationRequestFormById(id);

      if (!isReservationExist) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Reservation form not found for update",
        });
      }

      const reservationForm =
        await this.reservationRequestDao.updateReservationRequestForm(id, data);

      if (!reservationForm) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Unable to update",
        });
      }

      await this.reservationRequestUtils.sendReservationStatusUpdateEmail({
        oldReservationData: isReservationExist,
        updatedReservationData: reservationForm,
      });

      return reservationForm;
    } catch (error) {
      throw error;
    }
  }

  public async getReservationRequestForm(data: IPaginationBody): Promise<any> {
    try {
      const rowLimit = data.limit ? data.limit : 10;
      const rowSkip = data.page ? (data.page - 1) * rowLimit : 0;

      const matchCondition: any = { recordDeleted: false };

      // Construct the aggregation pipeline
      const pipeline = [
        {
          $match: matchCondition,
        },
        {
          $facet: {
            paginationData: [
              { $count: "total" }, // Count the total number of records
              {
                $addFields: {
                  currentPage: data.page > 0 ? Number(data.page) : 1, // Return the current page
                },
              },
            ],
            data: [
              { $sort: { createdAt: -1 } }, // Sort by creation date
              { $skip: rowSkip }, // Skip the documents for pagination
              { $limit: rowLimit }, // Limit the number of documents returned
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                  phoneNo: 1,
                  email: 1,
                  noOfPeople: 1,
                  status: 1,
                  reservationDate: 1,
                  message: 1,
                },
              },
            ],
          },
        },
      ];

      // Fetch reservation forms from DAO
      let reservationForms =
        await this.reservationRequestDao.getReservationRequestForm(pipeline);

      return reservationForms;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message:
          error.message || "Failed to retrieve reservation request forms",
      });
    }
  }

  public async deleteReservationRequestForm(
    id: string
  ): Promise<IReservationRequestSchema | null> {
    try {
      const reservationForm =
        await this.reservationRequestDao.deleteReservationRequestForm(id);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }
}
