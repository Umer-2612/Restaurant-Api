const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

// Printer configuration
const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Adjust to your printer model if needed
  interface: "tcp://192.168.29.2", // Use 'usb' for USB-connected printers
  options: {
    timeout: 5000, // Timeout for printer commands
  },
});

export default printer;
