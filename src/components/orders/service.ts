import { IOrderSchema, IOrderService } from "./interface";
import OrderDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";

class OrderService implements IOrderService {
  private orderDAO: OrderDAO;

  constructor() {
    this.orderDAO = new OrderDAO();
  }

  async create(data: Partial<IOrderSchema>): Promise<IOrderSchema> {
    try {
      return await this.orderDAO.createOrder(data);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to create order",
      });
    }
  }
}

export default OrderService;
