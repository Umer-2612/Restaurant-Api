import { Application } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import routes from "../../routes/index";
import Config from "../env/index";
import morgan from "morgan";
// import logger from "../logger";
import moment from "moment";

const expressWinston = require("express-winston");

export function setupMiddleware(app: Application): void {
  const corsOptions = {
    origin: function (origin: string, callback: any) {
      console.log({ origin });
      if (Config.whiteList.indexOf(origin) !== -1 || !origin) {
        // Allow requests from whitelisted origins or if there is no origin (e.g. Postman or server-side requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (authorization headers, etc.)
  } as CorsOptions;

  // Add raw body parser middleware ONLY for Stripe webhook route
  app.post("/stripe/webhook", bodyParser.raw({ type: "application/json" }));

  // Middleware for CORS
  app.use(cors(corsOptions));

  // Middleware for parsing URL-encoded bodies (for non-webhook routes)
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware for parsing JSON bodies (for non-webhook routes)
  app.use(bodyParser.json());

  // // Middleware for logging requests
  // app.use(
  //   expressWinston.logger({
  //     winstonInstance: logger,
  //     meta: false, // Add metadata like request and response
  //     msg: "HTTP {{req.method}} {{req.url}}", // Customize log message format
  //     expressFormat: true, // Use the default Express format
  //     colorize: false, // Colorize the logs (useful for console transport)
  //   })
  // );

  // const morganFormat = ":method :url :status :response-time ms";

  // app.use(
  //   morgan(morganFormat, {
  //     stream: {
  //       write: (message: any) => {
  //         const [method, url, status, responseTime] = message.trim().split(" ");

  //         logger.info(
  //           JSON.stringify({
  //             level: "info",
  //             date: moment(),
  //             method,
  //             url,
  //             status,
  //             responseTime,
  //           })
  //         );
  //       },
  //     },
  //   })
  // );

  // Mount the routes to the Express app
  app.use("/api/v1", routes);
}
