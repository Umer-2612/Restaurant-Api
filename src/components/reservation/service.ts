import ReservationRequestsDAO from "./dao";
import ReservationRequestsValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema } from "./interface";

class ReservationRequestFormService {

  public async createReservationRequestForm(data: IReservationRequestSchema): Promise<IReservationRequestSchema> {
    const { error } = ReservationRequestsValidation.validateCreateReservationRequestForm.validate(data);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const reservationForm = await ReservationRequestsDAO.createReservationRequestForm(data);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }

  public async updateReservationRequestForm(id: string, data: IReservationRequestSchema): Promise<IReservationRequestSchema | null> {
    const { error } = ReservationRequestsValidation.validateUpdateReservationRequestForm.validate(data);
    const { error: idError } = ReservationRequestsValidation.validateId(id);

    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    if (idError) {
      throw new ErrorHandler({ statusCode: 400, message: idError.message });
    }

    try {
      const reservationForm = await ReservationRequestsDAO.updateReservationRequestForm(id, data);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }

  public async getReservationRequestForm(): Promise<IReservationRequestSchema[] | null> {
    try {
      let reservationForms = await ReservationRequestsDAO.getReservationRequestForm();
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

  public async deleteReservationRequestForm(id: string): Promise<IReservationRequestSchema | null> {
    const { error } = ReservationRequestsValidation.validateId(id);
    if (error) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }

    try {
      const reservationForm = await ReservationRequestsDAO.deleteReservationRequestForm(id);
      return reservationForm;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReservationRequestFormService();
