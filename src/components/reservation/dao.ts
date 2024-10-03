import ReservationRequestsSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema, IPaginationBody } from "./interface";

/*************  ✨ Codeium Command 🌟  *************/
/**
 * @class ReservationRequestsDAO
 * @description Data Access Object for Reservation Request
 * @author Neel Rana
 * @since 2024-10-01
 */
export default class ReservationRequestsDAO {

  /**
   * @description Create a new Reservation Request
   * @param {IReservationRequestSchema} data reservation request data
   * @returns {Promise<IReservationRequestSchema>} newly created reservation request
   * @throws {ErrorHandler} if error occurs while creating reservation request
   */
  public static async createReservationRequestForm(data: IReservationRequestSchema): Promise<IReservationRequestSchema> {
    try {
      const reservationForm = await ReservationRequestsSchema.create(data);
      return reservationForm;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({ statusCode: 409, message: `${field} already exists.`, });
      }
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  /**
   * @description Update an existing Reservation Request
   * @param {string} id id of the reservation request to be updated
   * @param {IReservationRequestSchema} data reservation request data
   * @returns {Promise<IReservationRequestSchema | null>} updated reservation request
   * @throws {ErrorHandler} if error occurs while updating reservation request
   */
  public static async updateReservationRequestForm(id: string, data: IReservationRequestSchema): Promise<IReservationRequestSchema | null> {
    try {
      const reservationFrom = await ReservationRequestsSchema.findByIdAndUpdate(id, data, { new: true });

      return reservationFrom;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  /**
   * @description Get all Reservation Requests
   * @returns {Promise<{data: IReservationRequestSchema[] | null, totalCount: number}>} list of all reservation requests
   * @throws {ErrorHandler} if error occurs while getting reservation requests
   */
  public static async getReservationRequestForm(data: IPaginationBody): Promise<{ data: IReservationRequestSchema[] | null, totalCount: number }> {
    try {
      let rowLimit = data.limit ? data.limit : 10;
      let rowSkip = data.page ? (data.page * rowLimit) - rowLimit : 0;
      const query: any = { recordDeleted: false };
      let getreservationForms = await ReservationRequestsSchema.find(query).skip(rowSkip).limit(rowLimit);
      const total = await ReservationRequestsSchema.countDocuments({ recordDeleted: false });
      const result = {
        data: getreservationForms,
        totalCount: total
      }
      return result;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  /**
   * @description Delete a Reservation Request
   * @param {string} id id of the reservation request to be deleted
   * @returns {Promise<IReservationRequestSchema | null>} deleted reservation request
   * @throws {ErrorHandler} if error occurs while deleting reservation request
   */
  public static async deleteReservationRequestForm(id: string): Promise<IReservationRequestSchema | null> {
    try {
      const query = { recordDeleted: true };
      const deleteReservationRequestForm = await ReservationRequestsSchema.findByIdAndUpdate(id, query, { new: true });
      return deleteReservationRequestForm;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}