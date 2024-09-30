import { Request, Response } from "express";
import ContactRequestFormService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";

class ContactRequestFormController {

  public createContactRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactForm = await ContactRequestFormService.createContactRequestForm(req.body);
      Generator.sendResponse({
        res,
        message: "Contact form created successfully",
        data: contactForm,
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

  public updateContactRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactForm = await ContactRequestFormService.updateContactRequestForm(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Contact form updated successfully",
        data: contactForm,
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

  public getContactRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactForms = await ContactRequestFormService.getContactRequestForm();
      Generator.sendResponse({
        res,
        message: "Contact form found",
        data: contactForms,
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

  public deleteContactRequestForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactForms = await ContactRequestFormService.deleteContactRequestForm(req.params.id);
      Generator.sendResponse({
        res,
        message: "Contact form deleted successfully",
        data: contactForms,
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

export default new ContactRequestFormController();
