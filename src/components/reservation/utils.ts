import { IReservationRequestSchema } from "./interface";
import {
  reservationAcceptedTemplate,
  reservationDeclinedTemplate,
} from "../../utils/emailTemplates";
import NodeMailerService from "../../config/node-mailer/service";

class ReservationRequestFormUtils {
  private nodeMailerService: NodeMailerService;

  constructor() {
    this.nodeMailerService = new NodeMailerService();
  }

  public async sendReservationStatusUpdateEmail({
    oldReservationData,
    updatedReservationData,
  }: {
    oldReservationData: IReservationRequestSchema;
    updatedReservationData: IReservationRequestSchema;
  }): Promise<void> {
    if (
      oldReservationData.status === "Pending" &&
      updatedReservationData.status !== "Pending"
    ) {
      if (updatedReservationData.status === "Accepted") {
        // Send Mail to User about request accepted
        const emailContent = await reservationAcceptedTemplate({
          firstName: updatedReservationData.firstName,
          lastName: updatedReservationData.lastName,
          reservationDate: new Date(updatedReservationData.reservationDate),
        });

        // Send email to the user about the request being accepted
        await this.nodeMailerService.sendMail(
          updatedReservationData.email,
          emailContent
        );
      } else if (updatedReservationData.status === "Rejected") {
        // Send Mail to User about request rejected
        const emailContent = await reservationDeclinedTemplate({
          firstName: updatedReservationData.firstName,
          lastName: updatedReservationData.lastName,
          reservationDate: new Date(updatedReservationData.reservationDate),
        });

        // Send email to the user about the request being accepted
        await this.nodeMailerService.sendMail(
          updatedReservationData.email,
          emailContent
        );
      }
    }
  }
}

export default ReservationRequestFormUtils;
