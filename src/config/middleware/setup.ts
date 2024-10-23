import { Application } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import routes from "../../routes/index";
import Config from "../env/index";

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
    credentials: true, // Allow credentials (authorization headers, etc.)
  } as CorsOptions;

  app.use((req, res, next) => {
    // Access the full request URL

    const url = req.url;
    console.log({ url });

    next();
  });

  // Add raw body parser middleware ONLY for Stripe webhook route
  app.post("/stripe/webhook", bodyParser.raw({ type: "application/json" }));

  // Middleware for CORS
  app.use(cors(corsOptions));

  // Middleware for parsing URL-encoded bodies (for non-webhook routes)
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware for parsing JSON bodies (for non-webhook routes)
  app.use(bodyParser.json());

  // Mount the routes to the Express app
  app.use("/api/v1", routes);
}
