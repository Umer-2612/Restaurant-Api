import Joi from "joi";
import nodemailer from "nodemailer";
import UserSchema from "../components/user/model";
const CryptoJS = require("crypto-js");
import { IReservationRequestSchema } from "../components/reservation/interface";
import { IOrderSchema } from "../components/order/interface";

interface IErrorHandlerParam {
  statusCode: number;
  message: string;
}

interface mailPayload {
  email: string;
  subject: string;
  text: string;
  html: string;
}

interface mailOptionsPayload {
  from: object;
  to: Array<string>;
  subject: string;
  text: string;
  html: string;
}

export class ErrorHandler extends Error {
  statusCode: number;

  constructor({ statusCode, message }: IErrorHandlerParam) {
    super(message);
    this.statusCode = statusCode;
    // Error.captureStackTrace(this, this.constructor);
  }
};

export const objectIdValidator = (
  value: any,
  helpers: Joi.CustomHelpers<any>
) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    // Instead of using "any.invalid", you can use a custom message
    return helpers.error("string.custom", { message: "Invalid ID format" });
  }
  return value;
};

export function encrypt(email: string) {
  try {
    const cipherText = CryptoJS.AES.encrypt(email, process.env.ENC_DEC_KEY).toString();
    return cipherText;
  } catch (error) {
    throw new Error("encryption function failed!");
  }
};

export function decrypt(encryptedEmail: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedEmail, process.env.ENC_DEC_KEY);
    if (bytes.sigBytes > 0) {
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("decryption function failed!");
  }
};

export async function sendMail(contentBody: mailPayload) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.NODEMAILER_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Admin",
      address: process.env.NODEMAILER_USER_ID,
    }, // sender address
    to: [contentBody.email], // list of receivers
    subject: `${contentBody.subject}`, // Subject line
    text: `${contentBody.text}`, // plain text body
    html: `${contentBody.html}`, // html body
  };

  const main = async (transporter: any, mailOptions: mailOptionsPayload) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Email not sent" + " " + error);
    }
  };
  try {
    await main(transporter, mailOptions);
    return true;
  } catch (error) {
    console.log("Something went wrong" + error);
    return false;
  }
};

export function forgotPasswordTemplate(user_name: string, email: string, otp: number) {
  return {
    email: email,
    subject: `OTP For Forgot Password - ${user_name}`,
    text: `Here is your otp to verify`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification for Forgot Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      width: 100%;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f4;
      padding: 20px 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      background-color: #007BFF;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #555555;
    }
    .otp {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      border: none;
    }
    .otp:hover {
      background-color: #2980b9;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      background-color: #f8f9fa;
      font-size: 14px;
      color: #777777;
      border-top: 1px solid #ddd;
    }
    .footer p {
      margin: 0;
      padding: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Hello ${user_name},</p>
        <p>We received a request to reset your password. Please use the following OTP to proceed with the password reset:</p>
        <p style="font-size: 24px; font-weight: bold;">${otp}</p>
        <p>Your OTP will expire in 5 minutes, please verify before that!</p>
      </div>
      <div class="footer">
        <p>If you did not request this password reset, please ignore this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `,
  }
};

export function statusChangeTemplate(user_name: string, email: string, status: string, reservationDate: String) {
  return {
    email: email,
    subject: `Your reservation has been ${status} - ${user_name}`,
    text: `Here is your conformation mail`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant Reservation Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      width: 100%;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f4;
      padding: 20px 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      background-color: #007BFF;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #555555;
    }
    .status {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      border: none;
    }
    .status.accepted {
      background-color: #28a745;
    }
    .status.rejected {
      background-color: #dc3545;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      background-color: #f8f9fa;
      font-size: 14px;
      color: #777777;
      border-top: 1px solid #ddd;
    }
    .footer p {
      margin: 0;
      padding: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="container">
      <div class="header">
        <h1>Your Reservation Status</h1>
      </div>
      <div class="content">
        <p>Hello ${user_name},</p>
        <p>We are pleased to inform you that your reservation for <strong>Punjabi Touch Indian Restuarant</strong> on <strong>${reservationDate}</strong> has been:</p>
        <p class="status ${status == 'accepted' ? 'accepted' : 'rejected'}">${status}</p>
        <p>Thank you for choosing us! We look forward to serving you.</p>
      </div>
      <div class="footer">
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function orderTemplate(userInfo: IOrderSchema, orderDate: String) {
  return {
    email: userInfo.orderdEmail,
    subject: `Your order has been placed - ${userInfo.orderdName}`,
    text: `Here is your conformation mail`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      width: 100%;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f4;
      padding: 20px 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      background-color: #007BFF;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #555555;
    }
    .order-summary {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }
    .order-summary th, .order-summary td {
      border: 1px solid #dddddd;
      padding: 8px;
      text-align: left;
    }
    .order-summary th {
      background-color: #f2f2f2;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      background-color: #f8f9fa;
      font-size: 14px;
      color: #777777;
      border-top: 1px solid #ddd;
    }
    .footer p {
      margin: 0;
      padding: 5px 0;
    }
    .status {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      border: none;
    }
    .status.pending {
      background-color: #ffc107;
    }
    .status.paid {
      background-color: #28a745;
    }
    .status.unpaid {
      background-color: #dc3545;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
      </div>
      <div class="content">
        <p>Hello <strong>${userInfo.orderdName}</strong>,</p>
        <p>Thank you for your order! Below are the details of your order:</p>

        <table class="order-summary">
          <tr>
            <th>Order Date</th>
            <td>${orderDate}</td>
          </tr>
          <tr>
            <th>Order Status</th>
            <td>${userInfo.status}</td>
          </tr>
          <tr>
            <th>Total Price</th>
            <td>$${userInfo.totalPrice}</td>
          </tr>
          <tr>
            <th>Payment Method</th>
            <td>${userInfo.paymentMethod}</td>
          </tr>
          <tr>
            <th>Payment Status</th>
            <td>${userInfo.paymentStatus}</td>
          </tr>
        </table>

        <h3>Order Items</h3>
        <table class="order-summary">
          <thead>
            <tr>
              <th>Menu ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${userInfo.items.map(item => `
            <tr>
              <td>${item.menu}</td>
              <td>${item.quantity}</td>
            </tr>`).join('')}
          </tbody>
        </table>

        <p>We hope to serve you again soon. If you have any questions or concerns, feel free to contact us.</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing us!</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  }
}

export async function sendOtp(userName: string, email: string, otp: number) {
  try {
    let makePayload = forgotPasswordTemplate(userName, email, otp);
    try {
      await sendMail(makePayload);
      const date = new Date();
      let expiryTime = new Date(date.setMinutes(date.getMinutes() + 5));
      let otpString = otp.toString();
      let encryptedOtp = encrypt(otpString);
      let saveInfo = await UserSchema.findOneAndUpdate({ email: email }, { otp: encryptedOtp, otpExpiry: expiryTime });
      if (saveInfo == null) {
        throw new ErrorHandler({ statusCode: 400, message: "Something went wrong to save otp info" });
      }
      if (saveInfo) {
        let encryptedData = encrypt(JSON.stringify(email));
        return encryptedData;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  } catch (error: any) {
    throw new ErrorHandler({ statusCode: 400, message: error.message });
  }
};

export async function sendMailOfStatusChange(status: string, userDetails: IReservationRequestSchema) {
  try {
    let userName = userDetails.firstName + " " + userDetails.lastName;
    let date = userDetails.reservationDate.toISOString().split("T")[0];
    let makePayload = statusChangeTemplate(userName, userDetails.email, status, date);
    try {
      await sendMail(makePayload);
      return true;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  } catch (error: any) {
    throw new ErrorHandler({ statusCode: 400, message: error.message });
  }
};

export async function sendMailForOrder(userInfo: IOrderSchema) {
  try {
    let date = userInfo.orderDate.toISOString().split("T")[0];
    let payload = orderTemplate(userInfo, date);
    try {
      await sendMail(payload);
      return true;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  } catch (error: any) {
    throw new ErrorHandler({ statusCode: 400, message: error.message });
  }
};