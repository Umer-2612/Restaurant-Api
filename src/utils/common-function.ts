import Joi from "joi";
import { Response } from "express";

interface IErrorHandlerParam {
  statusCode: number;
  message: string;
}

export class ErrorHandler extends Error {
  statusCode: number;

  constructor({ statusCode, message }: IErrorHandlerParam) {
    super(message);
    this.statusCode = statusCode;
    // Error.captureStackTrace(this, this.constructor);
  }
}

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
