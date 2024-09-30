import { Request, Response } from "express";
import ReservationRequestFormService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";

class ReservationRequestFormController {

  public createReservationRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservationForm = await ReservationRequestFormService.createReservationRequestForm(req.body);
      Generator.sendResponse({
        res,
        message: "Reservation form created successfully",
        data: reservationForm,
      });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  }

  public updateReservationRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservationForm = await ReservationRequestFormService.updateReservationRequestForm(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Reservation form updated successfully",
        data: reservationForm,
      });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  }

  public getReservationRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservationForms = await ReservationRequestFormService.getReservationRequestForm();
      Generator.sendResponse({
        res,
        message: "Reservation form found",
        data: reservationForms,
      });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  }

  public deleteReservationRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservationForms = await ReservationRequestFormService.deleteReservationRequestForm(req.params.id);
      Generator.sendResponse({
        res,
        message: "Reservation form deleted successfully",
        data: reservationForms,
      });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        Generator.sendResponse({
          res: res,
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      } else {
        Generator.sendResponse({
          res: res,
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  }
}

export default new ReservationRequestFormController();
