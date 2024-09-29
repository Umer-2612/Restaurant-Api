import Config from "../../config/env/index";
import { IUserSchema } from "../../components/user/interface";
import UserDAO from "../../components/user/dao";
import { ErrorHandler } from "../../utils/common-function";
import jwtService from "../../utils/jwtService";

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: Config.googleConfig.clientId,
      clientSecret: Config.googleConfig.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        // Find user
        const user: IUserSchema | null = await UserDAO.getUser(
          { email: profile.email },
          ["-password"]
        );

        if (!user) {
          throw new ErrorHandler({
            statusCode: 404,
            message: "User not found.",
          });
        }

        // Generate a JWT token
        user.token = await jwtService.generateToken(user);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await UserDAO.getUser({ _id: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
