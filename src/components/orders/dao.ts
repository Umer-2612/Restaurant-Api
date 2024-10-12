import OrderSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IOrderSchema } from "./interface";

class OrderDAO {
  async createOrder(data: Partial<IOrderSchema>): Promise<IOrderSchema> {
    try {
      const res = await OrderSchema.create(data);
      return res;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }

      console.log({ error });

      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to create order",
      });
    }
  }

  async getAllOrders(pipeline: any): Promise<any> {
    try {
      const result = await OrderSchema.aggregate(pipeline);

      return result;
    } catch (error: any) {
      console.log({ error });
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve orders",
      });
    }
  }

  async getOrderById(id: string): Promise<any> {
    try {
      return await OrderSchema.findOne({ _id: id, recordDeleted: false });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve category",
      });
    }
  }
}

export default OrderDAO;
