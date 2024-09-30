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
      }
      // // Set token as an HTTP-only cookie
      // res.cookie("token", data.user.token, {
      //   httpOnly: true,
      //   // secure: process.env.NODE_ENV === 'production',  // Use secure in production
      //   // sameSite: "Strict", // Protect against CSRF attacks
      //   maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      // });

      Generator.sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "User signed in successfully",
        data,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };
  
}

export default new AuthController();
