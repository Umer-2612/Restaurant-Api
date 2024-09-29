import { Application } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import routes from "../../routes/index";
import session from "express-session";
import Config from "../env/index";
import { setupSwaggerDocs } from "../swagger/swagger";
var passport = require("passport");

export function setupMiddleware(app: Application): void {
  const corsOptions = {
    origin: function (origin: string, callback: any) {
      if (Config.whiteList.indexOf(origin) !== -1 || !origin) {
        // Allow requests from whitelisted origins or if there is no origin (e.g. Postman or server-side requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  } as CorsOptions;

  // Middleware for CORS
  app.use(cors(corsOptions));

  // Middleware for parsing JSON bodies
  app.use(bodyParser.json());

  // Middleware for parsing URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Initialize session (if using)
  app.use(
    session({
      secret: Config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using HTTPS
    })
  );

  // Initialize Passport and restore authentication state
  app.use(passport.initialize());
  app.use(passport.session());

  // Setup Swagger
  setupSwaggerDocs(app);

  // Mount the routes to the Express app
  app.use(routes);
}
