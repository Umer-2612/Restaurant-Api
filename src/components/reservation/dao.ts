import ReservationRequestsSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema } from "./interface";

export default class ReservationRequestsDAO {

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

  public static async updateReservationRequestForm(id: string, data: IReservationRequestSchema): Promise<IReservationRequestSchema | null> {
    try {
      const reservationFrom = await ReservationRequestsSchema.findByIdAndUpdate(id, data, { new: true });

      return reservationFrom;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async getReservationRequestForm(): Promise<IReservationRequestSchema[] | null> {
    try {
      const query: any = { is_deleted: false };
      let getreservationForms = await ReservationRequestsSchema.find(query);
      return getreservationForms;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public static async deleteReservationRequestForm(id: string): Promise<IReservationRequestSchema | null> {
    try {
      const query = { is_deleted: true };
      const deleteReservationRequestForm = await ReservationRequestsSchema.findByIdAndUpdate(id, query, { new: true });
      return deleteReservationRequestForm;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}