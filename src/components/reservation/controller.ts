import { Request, Response } from "express";
import ReservationRequestFormService from "./service";
import ReservationRequestsValidation from "./validation";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";


class ReservationRequestFormController {

  private reservationRequestFormService: ReservationRequestFormService;
  private reservationRequestsValidation: ReservationRequestsValidation;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.reservationRequestFormService = new ReservationRequestFormService();
    this.reservationRequestsValidation = new ReservationRequestsValidation();
  }

  /**
   * @private
   * @method handleError
   * @param {Response} res - The response object from Express.
   * @param {any} error - The error object.
   * @returns {Promise<any>}
   * @description Handles errors and sends an appropriate response.
   */
  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public createReservationRequestForm = async (req: Request, res: Response): Promise<any> => {
    const { error } = this.reservationRequestsValidation.validateCreateReservationRequestForm.validate(req.body);

    if (error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: error.details[0].message, // Get the first validation error message
      });
    }

    try {
      let data = req.body;
      const reservationForm = await this.reservationRequestFormService.createReservationRequestForm(data);
      Generator.sendResponse({
        res,
        message: "Reservation form created successfully",
        data: reservationForm,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }

  public updateReservationRequestForm = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const bodyValidation = this.reservationRequestsValidation.validateUpdateReservationRequestForm.validate(req.body);
    const idValidation = this.reservationRequestsValidation.validateId(id);

    if (bodyValidation.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: bodyValidation.error.details[0].message,
      });
    }

    if (idValidation.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: idValidation.error.details[0].message,
      });
    }

    try {
      const reservationForm = await this.reservationRequestFormService.updateReservationRequestForm(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Reservation form updated successfully",
        data: reservationForm,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
      }
    }

  public getReservationRequestForm = async (req: Request, res: Response): Promise<any> => {
    try {
      const reservationForms = await this.reservationRequestFormService.getReservationRequestForm();

      Generator.sendResponse({
        res,
        message: "Reservation form found",
        data: reservationForms,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }

  public deleteReservationRequestForm = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const idValidation = this.reservationRequestsValidation.validateId(id);

    if (idValidation.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: idValidation.error.details[0].message,
      });
    }

    try {
      const reservationForms = await this.reservationRequestFormService.deleteReservationRequestForm(req.params.id);
      Generator.sendResponse({
        res,
        message: "Reservation form deleted successfully",
        data: reservationForms,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }
}

export default new ReservationRequestFormController();
