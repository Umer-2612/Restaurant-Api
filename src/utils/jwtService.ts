import * as jwt from "jsonwebtoken";
import { IUserSchema } from "../components/user/interface";
import Config from "../config/env";
import { ErrorHandler } from "./common-function";

class JwtService {
  public async generateAccessToken(user: IUserSchema) {
    try {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        Config.jwtConfig.secretKey,
        { expiresIn: String(Config.jwtConfig.accessTokenExpiryTime) }
      );

      return token;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async generateRefreshToken(user: IUserSchema) {
    try {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        Config.jwtConfig.secretKey,
        { expiresIn: String(Config.jwtConfig.refreshTokenExpiryTime) }
      );

      return token;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async verifyToken(token: string) {
    try {
      const decodedContent = jwt.verify(token, Config.jwtConfig.secretKey);
      return decodedContent;
    } catch (error: any) {
      console.error("JWT verification error:", error.message); // Log the exact error
      throw new Error("Invalid or expired token");
    }
  }
}

export default new JwtService();
