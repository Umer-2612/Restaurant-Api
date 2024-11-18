import printer from "./configuration";

class ThermalService {
  // New method to print receipt
  public async printReceipt(orderDetails: any) {
    try {
      // Check if printer is connected
      //   const isConnected = await printer.isPrinterConnected();
      //   if (!isConnected) {
      //     console.error("Printer not connected!");
      //     throw new Error("Printer not connected");
      //   }
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
      for (const item of orderDetails.items) {
        if (item.item && item.item.name && item.item.price) {
          printer.println(
            `${item.item.name} x ${item.quantity} - $${(
              item.item.price / 100
            ).toFixed(2)}`
          );
        } else {
          printer.println("Invalid item details");
        }
      }

      // Payment Details
      printer.drawLine();
      printer.alignCenter();
      printer.println(`Total: $${(orderDetails.totalPrice / 100).toFixed(2)}`);
      printer.println(`Payment Method: ${orderDetails.paymentMethod}`);
      printer.println(`Order ID: ${orderDetails._id}`);
      if (orderDetails.customerDetails) {
        printer.println(
          `Customer: ${orderDetails.customerDetails.firstName} ${orderDetails.customerDetails.lastName}`
        );
        printer.println(`Email: ${orderDetails.customerDetails.email}`);
        printer.println(`Phone: ${orderDetails.customerDetails.phoneNo}`);
      }
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
