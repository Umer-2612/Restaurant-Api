const ThermalPrinter = require("node-thermal-printer");
const PrinterTypes = require("node-thermal-printer");

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Adjust based on your printer type
  interface: "usb", // Replace 'usb' with 'tcp://192.168.0.100' for network printers
  driver: require("printer"),
  options: {
    timeout: 5000,
  },
});

export default printer;
