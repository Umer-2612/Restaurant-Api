import { Request, Response } from "express";
import AuthService from "./service";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import jwtService from "../../utils/jwtService";

class AuthController {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  private async handleError(res: Response, error: any): Promise<void> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await AuthService.signUp(req.body);

      Generator.sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await AuthService.signIn(req.body);
      let data: any = { user };
      if (user) {
        // Generate a JWT token
        const token = await jwtService.generateToken(user);
        data.user.token = token;

        // Save the token in the database
        await AuthService.saveToken(req.body.email, token);
      }

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "User signed in successfully",
        data,
      });
    } catch (error: any) {

      console.log(error);
      this.handleError(res, error);
    }
  };

  public signOut = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      const userDetails = await AuthService.signOut(user.email);
      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "User signed out successfully",
        data: userDetails,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public getUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "success",
        data: user,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      let data = req.body;
      const user = (req as any).user;
      const updatedUser = await AuthService.updateProfile(user.email, data);
      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const user = (req as any).user;
      const updatedUser = await AuthService.changePassword(user.email, data);
      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Password changed successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const updatedUser = await AuthService.forgotPassword(data);
      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Otp is sent to your email",
        data: updatedUser,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const updatedUser = await AuthService.resetPassword(data);

      if (updatedUser) {
        // Generate a JWT token
        const token = await jwtService.generateToken(updatedUser);

        // Save the token in the database
        await AuthService.saveToken(updatedUser.email, token);
      }

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Password changed successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };
}

export default new AuthController();
