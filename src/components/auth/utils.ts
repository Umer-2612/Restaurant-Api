// import * as jwt from "jsonwebtoken";
// import { ErrorHandler } from "../../utils/common-function";
// import { IUserSchema } from "../user/interface";
// import Config from "../../config/env";

// class AuthUtils {
//   public generateToken(user: IUserSchema) {
//     try {
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         Config.jwtConfig.secretKey,
//         { expiresIn: String(Config.jwtConfig.expiryTime) }
//       );

//       return token;
//     } catch (error: any) {
//       throw new ErrorHandler({ statusCode: 400, message: error.message });
//     }
//   }
// }

// export default new AuthUtils();
