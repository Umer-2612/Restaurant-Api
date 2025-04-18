import ReservationRequestsSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IReservationRequestSchema, IPaginationBody } from "./interface";

export default class ReservationRequestsDAO {
  public async createReservationRequestForm(
    data: IReservationRequestSchema
  ): Promise<IReservationRequestSchema> {
    try {
      const reservationForm = await ReservationRequestsSchema.create(data);
      return reservationForm;
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

  public async updateReservationRequestForm(
    id: string,
    data: IReservationRequestSchema
  ): Promise<IReservationRequestSchema | null> {
    try {
      const reservationFrom = await ReservationRequestsSchema.findOneAndUpdate(
        { _id: id, recordDeleted: false },
        data,
        { new: true }
      );

      return reservationFrom;
    } catch (error: any) {
      console.log({ error });
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public async getReservationRequestForm(pipeline: any): Promise<any> {
    try {
      const result = await ReservationRequestsSchema.aggregate(pipeline);

      return result;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve reservation request forms",
      });
    }
  }

  public async getReservationRequestFormById(
    id: string
  ): Promise<IReservationRequestSchema | null> {
    try {
      const res = await ReservationRequestsSchema.findOne({
        _id: id,
        recordDeleted: false,
      });
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve menu item",
      });
    }
  }

  public async deleteReservationRequestForm(
    id: string
  ): Promise<IReservationRequestSchema | null> {
    try {
      const query = { recordDeleted: true };
      const deleteReservationRequestForm =
        await ReservationRequestsSchema.findByIdAndUpdate(id, query, {
          new: true,
        });
      return deleteReservationRequestForm;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}
