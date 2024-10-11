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
}

export default OrderDAO;
