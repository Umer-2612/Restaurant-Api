import { IOrderSchema, IOrderService } from "./interface";
import OrderDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";
import { IQueryBody } from "../menu-item/interface";
import { pipeline } from "stream/promises";

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

  async getAllOrders(body: IQueryBody): Promise<any> {
    try {
      const rowLimit = body.limit ? body.limit : 10;
      const rowSkip = body.page ? (body.page - 1) * rowLimit : 0;
      const matchCondition: any = {
        recordDeleted: false,
        status: "Paid",
      };

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
                },
              },
            ],
          },
        },
        {
          $unwind: "$menuItemDetails", // Unwind the menuItemDetails array
        },
        {
          $addFields: {
            userDetails: {
              firstName: "Umer",
              lastName: "Karachiwala",
              email: "karachiwalaumer2612@gmail.com",
              phone: "8200084872",
            },
          },
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
            userDetails: { $first: "$userDetails" },
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
}

export default OrderService;
