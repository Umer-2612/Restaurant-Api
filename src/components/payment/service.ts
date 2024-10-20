import ThermalService from "../../config/thermal-printer/service";
import { ErrorHandler } from "../../utils/common-function";
import OrderSchema from "../orders/model";

class PaymentService {
  private thermalService: ThermalService;

  constructor() {
    this.thermalService = new ThermalService();
  }

  // New method to print receipt
  public async handleSessionComplete(event: any) {
    const session: any = event.data.object;
    const { orderId } = session.metadata;

    try {
      const orderDetails = await OrderSchema.findOne({
        _id: orderId,
        recordDeleted: false,
      });

      if (!orderDetails) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Order not found.",
        });
      }

      orderDetails.status = "Paid";

      orderDetails.paymentDetails = {
        method: session.payment_method_types[0],
        paymentIntent: session.payment_intent,
        sessionId: session.id,
        totalAmountReceivedInCents: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        customerCardDetails: {
          email: session.customer_details.email,
          name: session.customer_details.name,
          phone: session.customer_details.phone,
        },
      };

      await orderDetails.save();

      // Print receipt
      await this.thermalService.printReceipt(orderDetails, session);

      // Footer
    } catch (error) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Error while procession payment event.",
      });
    }
  }
}

export default PaymentService;
