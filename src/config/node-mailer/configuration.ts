import nodemailer, { TransportOptions } from "nodemailer";
import Config from "../env/index";

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: Config.nodeMailerConfig.outgoingServer, // Specify the outgoing server from env
    port: Config.nodeMailerConfig.outgoingServerSMTP, // SMTP port
    secure: true, // Use true for 465, false for other ports
    auth: {
      user: Config.nodeMailerConfig.username, // Use username from env
      pass: Config.nodeMailerConfig.password, // Use password from env
    },
  } as TransportOptions);

  // Verify the transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error with Nodemailer configuration:", error);
    } else {
      console.log("Nodemailer is ready to send emails:", success);
    }
  });

  return transporter;
};

export default createTransporter;
