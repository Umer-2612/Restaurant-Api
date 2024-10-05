import { NextFunction, Request, Response } from "express";
import jwtService from "../../utils/jwtService";
import { IUserSchema } from "../../components/user/interface";
import UserDAO from "../../components/user/dao";
import { ErrorHandler } from "../../utils/common-function";
import { RequestWithUser } from "../../components/auth/interface";

type IDecodedTokenResponse = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};

class AuthMiddleware {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1]; // Extract token from header

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token required" });
      }

      if (token) {
        try {
          const decoded = (await jwtService.verifyToken(
            token
          )) as IDecodedTokenResponse;

          // Fetch the user from the database
          const user: IUserSchema | null = await UserDAO.getUser(
            { _id: decoded._id, email: decoded.email },
            ["-password"]
          );

          if (!user) {
            throw new ErrorHandler({
              statusCode: 404,
              message: "User not found.",
            });
          }

          (req as RequestWithUser).user = JSON.parse(JSON.stringify(user)); // Attach the user object to the request

          next();
        } catch (error) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export default new AuthMiddleware();
