import OrderSchema from "./model";
import { ErrorHandler, sendMailForOrder } from "../../utils/common-function";
import { IOrderSchema } from "./interface";
import MenuItemSchema from "../menu-item/model";

export default class OrderDAO {
  public static async createOrder(data: IOrderSchema): Promise<IOrderSchema | any> {
    try {
      const saveOrder = await OrderSchema.create(data);
      if(!saveOrder) {
        throw new ErrorHandler({
          statusCode: 500,
          message: "Database Error: Unable to create order",
        });
      }
      let userInfo = await OrderSchema.findOne({ _id: saveOrder._id });
      if (!userInfo) { 
        throw new ErrorHandler({
          statusCode: 500,
          message: "Database Error: Unable to retrive order",
        });
      }
      let dataObj = [];
      let itemsArray = userInfo.items;
      for (let index = 0; index < itemsArray.length; index++) {
        const element = itemsArray[index];
        let itemName = await MenuItemSchema.findOne({ _id: element.menu }, { itemName: 1 });
        if (!itemName) {
          throw new ErrorHandler({
            statusCode: 500,
            message: "Database Error: Unable to retrive order",
          });
        }
        dataObj.push({
          menu: itemName.itemName,
          quantity: element.quantity,
        });
      }
      userInfo = userInfo.toObject();
      userInfo.items = dataObj;
      let sendEmail = await sendMailForOrder(userInfo);
      if (sendEmail) {
        return "Email sent successfully";
      } else {
        return "Email not sent";
      }
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

  public static async getOrderDetails(pipeline: any): Promise<any> {
    try {
      const result = await OrderSchema.aggregate(pipeline);

      return result;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve orders",
      });
    }
  }
}
