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
    subject: "Reservation Accepted",
    html: `
        <h1>Your Reservation has been Accepted</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Your reservation on ${reservationDate.toLocaleString()} has been accepted.</p>
        <p>Thank you for choosing us!</p>
        <p>If you have any questions, feel free to contact us.</p>
      `,
  };
};

export const reservationDeclinedTemplate = async ({
  firstName,
  lastName,
  reservationDate,
}: IReservationStatusTemplateBody) => {
  return {
    subject: "Reservation Declined",
    html: `
      <h1>Your Reservation has been Declined</h1>
      <p>Dear ${firstName} ${lastName},</p>
      <p>We regret to inform you that your reservation on ${reservationDate.toLocaleString()} has been declined.</p>
      <p>We apologize for the inconvenience. If you have any questions or would like to reschedule, feel free to contact us.</p>
      <p>Thank you for understanding.</p>
    `,
  };
};
