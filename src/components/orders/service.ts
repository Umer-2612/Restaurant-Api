import { IGetAllOrderBody, IOrderSchema, IOrderService } from "./interface";
import OrderDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { Types } from "mongoose";

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

  async getAllOrders(body: IGetAllOrderBody): Promise<any> {
    try {
      const rowLimit = body.limit ? body.limit : 10;
      const rowSkip = body.page ? (body.page - 1) * rowLimit : 0;
      const matchCondition: any = {
        recordDeleted: false,
        status: "Paid",
        paymentMethod: { $in: ["COD", "Online"] },
      };

      if (body.id) {
        matchCondition._id = new Types.ObjectId(body.id);
      }

      const pipeline = [
        {
          $match: matchCondition,
        },
        {
          $unwind: "$items", // Unwind the items array to access each item
        },
        {
          $lookup: {
            from: "menuItem", // The collection you're referencing (ensure it matches the collection name)
            localField: "items.item", // The field in the orders collection
            foreignField: "_id", // The field in the menuItem collection
            as: "menuItemDetails", // The alias for the joined data
            pipeline: [
              { $match: { recordDeleted: false } },
              {
                $project: {
                  _id: 1,
                  itemName: 1,
                  itemImagePath: 1,
                  itemPrice: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$menuItemDetails", // Unwind the menuItemDetails array
        },
        {
          $group: {
            _id: "$_id", // Group back the orders by their original _id
            cart: {
              $push: {
                item: "$menuItemDetails", // Push the populated item details
                quantity: "$items.quantity",
              },
            },
            customerDetails: { $first: "$customerDetails" },
            status: { $first: "$status" },
            createdAt: { $first: "$createdAt" },
            totalPrice: { $first: "$totalPrice" },
          },
        },
        {
          $facet: {
            paginationData: [
              { $count: "total" }, // Count the total number of records
              {
                $addFields: {
                  currentPage: body.page > 0 ? Number(body.page) : 1, // Return the current page
                },
              },
            ],
            data: [
              { $sort: { createdAt: -1 } }, // Sort by creation date
              { $skip: rowSkip }, // Skip the documents for pagination
              { $limit: rowLimit }, // Limit the number of documents returned`
            ],
          },
        },
      ];

      const res = await this.orderDAO.getAllOrders(pipeline);
      return res;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve menu items",
      });
    }
  }

  async getOrder(id: string): Promise<any> {
    try {
      const body = {
        id,
        page: 1,
        limit: 1,
      };
      const orderDetails = await this.getAllOrders(body);
      if (!orderDetails) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Category not found",
        });
      }

      return orderDetails[0].data[0];
    } catch (error: any) {
      throw error instanceof ErrorHandler
        ? error
        : new ErrorHandler({
            statusCode: 500,
            message: error.message || "Failed to retrieve category",
          });
    }
  }
}

export default OrderService;
