import ReservationRequestsDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema, IPaginationBody } from "./interface";

export default class ReservationRequestFormService {
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
        await ReservationRequestsDAO.createReservationRequestForm(data);
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
      const reservationForm =
        await ReservationRequestsDAO.updateReservationRequestForm(id, data);
      if (!reservationForm) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Reservation form not found for update",
        });
      }
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
  public async getReservationRequestForm(
    data: IPaginationBody
  ): Promise<{ data: IReservationRequestSchema[] | null; totalCount: number }> {
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
                  name: 1,
                  email: 1,
                  date_of_reservation: 1,
                  createdAt: 1,
                },
              },
            ],
          },
        },
      ];

      // Fetch reservation forms from DAO
      let reservationForms =
        await ReservationRequestsDAO.getReservationRequestForm(pipeline);

      // Post-processing the data if necessary
      if (
        reservationForms &&
        reservationForms.data &&
        reservationForms.data.length
      ) {
        reservationForms.data = reservationForms.data.map((e) => {
          // e is now a plain JS object, so no need for .toObject()
          if (e.date_of_reservation) {
            e.actual_date = new Date(e.date_of_reservation).toLocaleDateString(
              undefined,
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            e.actual_time = new Date(
              e.date_of_reservation
            ).toLocaleTimeString();
          }
          return e;
        });
      }

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
        await ReservationRequestsDAO.deleteReservationRequestForm(id);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }
}
