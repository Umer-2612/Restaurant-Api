/**
 * @class ContactRequestFormController
 * @description Handles contact request form related operations.
 */
import { Request, Response } from "express";
import ContactRequestFormService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import ContactRequestsValidation from "./validation";
import { IPaginationBody } from "./interface";
import { RequestWithUser } from "../auth/interface";

class ContactRequestFormController {
  /**
   * @private
   * @type {ContactRequestFormService}
   * @description Instance of ContactRequestFormService.
   */
  private contactRequestFormService: ContactRequestFormService;

  /**
   * @private
   * @type {ContactRequestsValidation}
   * @description Instance of ContactRequestsValidation.
   */
  private contactRequestsValidation: ContactRequestsValidation;

  /**
   * @constructor
   * @description Initializes the controller.
   */
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

  /**
   * @public
   * @method createContactRequestForm
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Creates a new contact request form.
   */
  public createContactRequestForm = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { error } =
      this.contactRequestsValidation.validateCreateContactRequestForm.validate(
        req.body
      );

    if (error) {
      return Generator.sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: error.details[0].message, // Get the first validation error message
      });
    }

    try {
      const contactForm =
        await this.contactRequestFormService.createContactRequestForm(req.body);
      Generator.sendResponse({
        res,
        message: "Contact form created successfully",
        data: contactForm,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method updateContactRequestForm
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Updates an existing contact request form.
   */
  public updateContactRequestForm = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const user = (req as any).user;
    if (!user) {
      return Generator.sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const bodyValidation =
      this.contactRequestsValidation.validateUpdateContactRequestForm.validate(
        req.body
      );
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
      console.log({ error });
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method getContactRequestForm
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Retrieves all contact request forms.
   */
  public getContactRequestForm = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const user = (req as any).user;
    if (!user) {
      return Generator.sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }

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
        data: contactForms,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method deleteContactRequestForm
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Deletes a contact request form.
   */
  public deleteContactRequestForm = async (
    req: RequestWithUser,
    res: Response
  ): Promise<any> => {
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
      console.log({ error });
      await this.handleError(res, error);
    }
  };
}

export default new ContactRequestFormController();
