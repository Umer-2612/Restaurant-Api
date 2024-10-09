import OrderDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IOrderSchema, IPaginationBody } from "./interface";

export default class OrderService {
  public async createOrder(data: IOrderSchema): Promise<IOrderSchema> {
    try {
      const createOrder = await OrderDAO.createOrder(data);
      return createOrder;
    } catch (error) {
      throw error;
    }
  }

  public async getOrderDetails(data: IPaginationBody): Promise<any> {
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
                  items: 1,
                  totalPrice: 1,
                  status: 1,
                  orderDate: 1,
                  orderdName: 1,
                  orderdEmail: 1,
                  paymentMethod: 1,
                  paymentStatus: 1,
                },
              },
            ],
          },
        },
      ];

      // Fetch reservation forms from DAO
      let getOrders = await OrderDAO.getOrderDetails(pipeline);
      return getOrders;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message:
          error.message || "Failed to retrieve reservation request forms",
      });
    }
  }
}
