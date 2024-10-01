import { Request, Response } from "express";
import ContactRequestFormService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import ContactRequestsValidation from "./validation";

class ContactRequestFormController {

  private contactRequestFormService: ContactRequestFormService;
  private contactRequestsValidation: ContactRequestsValidation;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.contactRequestFormService = new ContactRequestFormService();
    this.contactRequestsValidation = new ContactRequestsValidation();
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

  public createContactRequestForm = async (req: Request, res: Response): Promise<any> => {
    const { error } = this.contactRequestsValidation.validateCreateContactRequestForm.validate(req.body);

    if (error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: error.details[0].message, // Get the first validation error message
      });
    }

    try {
      const contactForm = await this.contactRequestFormService.createContactRequestForm(req.body);
      Generator.sendResponse({
        res,
        message: "Contact form created successfully",
        data: contactForm,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }

  public updateContactRequestForm = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const bodyValidation = this.contactRequestsValidation.validateUpdateContactRequestForm.validate(req.body);
    const idValidation = this.contactRequestsValidation.validateId(id);

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
      const contactForm = await this.contactRequestFormService.updateContactRequestForm(req.params.id, req.body);
      Generator.sendResponse({
        res,
        message: "Contact form updated successfully",
        data: contactForm,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }

  public getContactRequestForm = async (req: Request, res: Response): Promise<any> => {
    try {
      const contactForms = await this.contactRequestFormService.getContactRequestForm();
      Generator.sendResponse({
        res,
        message: "Contact form found",
        data: contactForms,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }

  public deleteContactRequestForm = async (req: Request, res: Response): Promise<any> => {
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
      const contactForms = await this.contactRequestFormService.deleteContactRequestForm(req.params.id);
      Generator.sendResponse({
        res,
        message: "Contact form deleted successfully",
        data: contactForms,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  }
}

export default new ContactRequestFormController();
