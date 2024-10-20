import { IOrderSchema } from "../../components/orders/interface";
import printer from "./index";

class ThermalService {
  // New method to print receipt
  public async printReceipt(orderDetails: IOrderSchema, session: any) {
    try {
      // Check if printer is connected
      const isConnected = await printer.isPrinterConnected();
      if (!isConnected) {
        console.error("Printer not connected!");
        throw new Error("Printer not connected");
      }

      // Print receipt with a structured template
      printer.alignCenter();
      printer.setFont("A"); // Optional: Set font style (A, B, or C)
      printer.setSize(2, 2); // Optional: Set size (width, height)

      // Header
      printer.println("*** Restaurant Name ***");
      printer.println("123 Food St, City, State");
      printer.println("Phone: (123) 456-7890");
      printer.println(`Date: ${new Date().toLocaleDateString()}`);
      printer.println(`Time: ${new Date().toLocaleTimeString()}`);
      printer.drawLine();

      // Order Details
      printer.alignLeft();
      printer.println("Items Ordered:");
      orderDetails.items.forEach((item: any) => {
        printer.println(
          `${item.name} x ${item.quantity} - $${(item.price / 100).toFixed(2)}`
        );
      });

      // Payment Details
      printer.drawLine();
      printer.alignCenter();
      printer.println(`Total: $${(session.amount_total / 100).toFixed(2)}`);
      printer.println(`Payment Method: ${session.payment_method_types[0]}`);
      printer.println(`Order ID: ${orderDetails._id}`);
      printer.println(`Customer: ${session.customer_details.name}`);
      printer.println(`Email: ${session.customer_details.email}`);
      printer.println(`Phone: ${session.customer_details.phone}`);
      printer.drawLine();

      // Footer
      printer.alignCenter();
      printer.println("Thank you for your order!");
      printer.println("Visit us again!");
      printer.cut();

      // Send the print job
      const executePrint = await printer.execute();
      if (executePrint) {
        console.log("Receipt printed successfully");
      } else {
        console.error("Failed to print the receipt");
      }
    } catch (error) {
      console.error("Error printing receipt:", error);
    }
  }
}

export default ThermalService;
