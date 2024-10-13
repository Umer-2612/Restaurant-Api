type IReservationStatusTemplateBody = {
  firstName: string;
  lastName: string;
  reservationDate: Date;
};

export const reservationAcceptedTemplate = async ({
  firstName,
  lastName,
  reservationDate,
}: IReservationStatusTemplateBody) => {
  return {
    subject: `Your reservation has been Accepted - ${firstName} ${lastName}`,
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
      background-color: #f8f8f8;
      width: 100%;
    }
    img {
      max-width: 200px;
      margin-bottom: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      padding: 10px;
      background-color: #ffffff;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f8f8f8;
      padding: 20px 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #000000
    }
    .content {
      padding: 16px;
      line-height: 1.6;
      color: #555555;
    }
    .status {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      border: none;
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
    <img src="https://umer-karachiwala.tech/assets/punjabi-touch-cropped-BSNMGgT6.png" alt="Company Logo">
    <div class="header">
        <h1>Your Reservation Status</h1>
      </div>
      <div class="content">
        <p>Hello ${firstName} ${lastName},</p>
        <p>We are pleased to inform you that your reservation for <strong>Punjabi Touch Indian Restuarant</strong> on <strong>${reservationDate.toLocaleString()}</strong> has been:</p>
        <p class="status">Accepted</p>
        <p>Thank you for choosing us! We look forward to serving you.</p>
      </div>
      <div class="footer">
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>T2/356 Middle Rd 356 Middle Rd, Greenbank QLD 4124, Australia</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };
};

export const reservationDeclinedTemplate = async ({
  firstName,
  lastName,
  reservationDate,
}: IReservationStatusTemplateBody) => {
  return {
    subject: `Your reservation has been Declined - ${firstName} ${lastName}`,
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
      background-color: #f8f8f8;
      width: 100%;
    }
    img {
      max-width: 200px;
      margin-bottom: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      padding: 10px;
      background-color: #ffffff;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f8f8f8;
      padding: 20px 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #000000
    }
    .content {
      padding: 16px;
      line-height: 1.6;
      color: #555555;
    }
    .status {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #dc3545;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      border: none;
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
    <img src="https://umer-karachiwala.tech/assets/punjabi-touch-cropped-BSNMGgT6.png" alt="Company Logo">
    <div class="header">
        <h1>Your Reservation Status</h1>
      </div>
      <div class="content">
        <p>Hello ${firstName} ${lastName},</p>
        <p>We are pleased to inform you that your reservation for <strong>Punjabi Touch Indian Restuarant</strong> on <strong>${reservationDate.toLocaleString()}</strong> has been:</p>
        <p class="status">Declined</p>
        <p>Thank you for choosing us! We look forward to serving you.</p>
      </div>
      <div class="footer">
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>T2/356 Middle Rd 356 Middle Rd, Greenbank QLD 4124, Australia</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };
};
