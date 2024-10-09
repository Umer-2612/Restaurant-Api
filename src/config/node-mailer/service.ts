import createTransporter from "./configuration";
import nodemailer from "nodemailer";

// Define the structure for email content
interface IEmailContent {
  subject: string;
  html: string;
}

class NodeMailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = createTransporter();
  }

  async sendMail(to: string, emailContent: IEmailContent): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address from environment variable
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Re-throw the error for further handling
    }
  }
}

export default NodeMailerService;
