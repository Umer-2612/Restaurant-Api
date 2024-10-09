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

  /**
   * Creates a new Reservation Request Form
   * @method createReservationRequestForm
   * @param {IReservationRequestSchema} data Reservation Request Form data
   * @returns {Promise<IReservationRequestSchema>} newly created Reservation Request Form
   * @throws {ErrorHandler} if error occurs while creating Reservation Request Form
   */
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

  /**
   * Updates an existing Reservation Request Form
   * @method updateReservationRequestForm
   * @param {string} id id of the Reservation Request Form to be updated
   * @param {IReservationRequestSchema} data Reservation Request Form data
   * @returns {Promise<IReservationRequestSchema | null>} updated Reservation Request Form
   * @throws {ErrorHandler} if error occurs while updating Reservation Request Form
   */
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

  /**
   * Gets all Reservation Request Forms
   * @method getReservationRequestForm
   * @returns {Promise<{data: IReservationRequestSchema[] | null, totalCount: number}>} list of all Reservation Request Forms
   * @throws {ErrorHandler} if error occurs while getting Reservation Request Forms
   */
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

      // // Post-processing the data if necessary
      // if (
      //   reservationForms &&
      //   reservationForms.data &&
      //   reservationForms.data.length
      // ) {
      //   reservationForms.data = reservationForms.data.map((e) => {
      //     // e is now a plain JS object, so no need for .toObject()
      //     if (e.reservationDate) {
      //       e.actual_date = new Date(e.reservationDate).toLocaleDateString(
      //         undefined,
      //         {
      //           weekday: "long",
      //           year: "numeric",
      //           month: "long",
      //           day: "numeric",
      //         }
      //       );
      //       e.actual_time = new Date(e.reservationDate).toLocaleTimeString();
      //     }
      //     return e;
      //   });
      // }

      return reservationForms;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message:
          error.message || "Failed to retrieve reservation request forms",
      });
    }
  }

  /**
   * Deletes a Reservation Request Form
   * @method deleteReservationRequestForm
   * @param {string} id id of the Reservation Request Form to be deleted
   * @returns {Promise<IReservationRequestSchema | null>} deleted Reservation Request Form
   * @throws {ErrorHandler} if error occurs while deleting Reservation Request Form
   */
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
