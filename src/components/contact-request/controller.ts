import { Request, Response } from "express";
import ContactRequestFormService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import ContactRequestsValidation from "./validation";
import { IPaginationBody } from "./interface";
import { RequestWithUser } from "../auth/interface";
import LoggerService from "../../config/logger/service";

class ContactRequestFormController {
  private contactRequestFormService: ContactRequestFormService;
  private contactRequestsValidation: ContactRequestsValidation;
  // private loggerService: LoggerService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.contactRequestFormService = new ContactRequestFormService();
    this.contactRequestsValidation = new ContactRequestsValidation();
    // this.loggerService = new LoggerService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public create = async (req: Request, res: Response): Promise<any> => {
    const { error } =
      this.contactRequestsValidation.validateCreateContactRequestForm.validate(
        req.body
      );

    if (error) {
      // If validation fails, return the error response
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: error.details[0].message,
      });
    }

    try {
      const contactForm =
        await this.contactRequestFormService.createContactRequestForm(req.body);
      Generator.sendResponse({
        res,
        message:
          "Thank you for contacting us! We appreciate your message and will get back to you shortly.",
        data: contactForm,
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };

  public update = async (req: RequestWithUser, res: Response): Promise<any> => {
    const { id } = req.params;
    const bodyValidation =
      this.contactRequestsValidation.validateUpdateContactRequestForm.validate(
        req.body
      );
    const idValidation = this.contactRequestsValidation.validateId(id);

    if (bodyValidation.error) {
      // If validation fails, return the error response
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
      const contactForm =
        await this.contactRequestFormService.updateContactRequestForm(
          req.params.id,
          req.body
        );
      Generator.sendResponse({
        res,
        message: "Contact form updated successfully",
        data: contactForm,
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };

  public getAll = async (req: Request, res: Response): Promise<any> => {
    const validateBody = this.contactRequestsValidation.validatePaginationBody(
      req.query
    );

    if (validateBody.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: validateBody.error.details[0].message,
      });
    }

    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const paginationData: IPaginationBody = { page, limit };
      const contactForms =
        await this.contactRequestFormService.getContactRequestForm(
          paginationData
        );
      Generator.sendResponse({
        res,
        message: "Contact form found",
        data: contactForms[0].data,
        paginationData: contactForms[0].paginationData[0],
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response): Promise<any> => {
    const { id } = req.params;
    const idValidation = this.contactRequestsValidation.validateId(id);

    if (idValidation.error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: idValidation.error.details[0].message,
      });
    }

    try {
      const contactForms =
        await this.contactRequestFormService.deleteContactRequestForm(
          req.params.id
        );
      Generator.sendResponse({
        res,
        message: "Contact form deleted successfully",
        data: contactForms,
      });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };
}

export default new ContactRequestFormController();
