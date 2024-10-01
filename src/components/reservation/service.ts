/**
 * Service class for Reservation Request Form
 * @class ReservationRequestFormService
 * @author Neel Rana
 * @since 2024-10-01
 */
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
  public async createReservationRequestForm(data: IReservationRequestSchema): Promise<IReservationRequestSchema> {
    try {
      const reservationForm = await ReservationRequestsDAO.createReservationRequestForm(data);
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
  public async updateReservationRequestForm(id: string, data: IReservationRequestSchema): Promise<IReservationRequestSchema | null> {
    try {
      const reservationForm = await ReservationRequestsDAO.updateReservationRequestForm(id, data);
      if(!reservationForm) {
        throw new ErrorHandler({ statusCode: 404, message: "Reservation form not found for update" });
      }
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets all Reservation Request Forms
   * @method getReservationRequestForm
   * @returns {Promise<IReservationRequestSchema[] | null>} list of all Reservation Request Forms
   * @throws {ErrorHandler} if error occurs while getting Reservation Request Forms
   */
  public async getReservationRequestForm(data: IPaginationBody ): Promise<IReservationRequestSchema[] | null> {
    try {
      let reservationForms = await ReservationRequestsDAO.getReservationRequestForm(data);
      if (reservationForms && reservationForms.length) {
        reservationForms = reservationForms.map(e => {
          let dateObj = e.toObject();
          if (e.date_of_reservation) {
            dateObj.actual_date = e.date_of_reservation.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            dateObj.actual_time = e.date_of_reservation.toLocaleTimeString();
          }
          return dateObj;
        });
      }
      return reservationForms;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a Reservation Request Form
   * @method deleteReservationRequestForm
   * @param {string} id id of the Reservation Request Form to be deleted
   * @returns {Promise<IReservationRequestSchema | null>} deleted Reservation Request Form
   * @throws {ErrorHandler} if error occurs while deleting Reservation Request Form
   */
  public async deleteReservationRequestForm(id: string): Promise<IReservationRequestSchema | null> {
    try {
      const reservationForm = await ReservationRequestsDAO.deleteReservationRequestForm(id);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }
}