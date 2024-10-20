import os from "os";
import express, { Application, Request, Response, NextFunction } from "express";
import config from "../env/index";
import Database from "../database/index";
import { ErrorHandler } from "../../utils/common-function";
import { setupMiddleware } from "../middleware/setup";
import Config from "../env/index";
import path from "path";

class Server {
  private app: Application;
  private database: Database;

  constructor() {
    this.app = express();
    this.start();
    this.database = new Database();
    this.setup();
  }

  private async setup(): Promise<void> {
    // Setup middleware
    setupMiddleware(this.app);

    try {
      await this.database.connect();
    } catch (error) {
      console.error("Error connecting to the database:", error);
      process.exit(1); // Exit the process if database connection fails
    }

    // Serve static files from the Vite build
    this.app.use(
      express.static(path.join(__dirname, "../../../../Restaurant-Web/dist"))
    ); // Adjust path to your Vite dist folder

    // Handle all other routes by serving the index.html file
    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(
        path.join(__dirname, "../../../../Restaurant-Web/dist/index.html")
      );
    });

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ErrorHandler) {
          res.status(err.statusCode).json({ error: err.message });
        } else {
          console.error("Unhandled error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  }

  private start(): void {
    const hostname = Config.nodeEnv === "PROD" ? os.hostname() : "localhost";
    const protocol = Config.nodeEnv === "PROD" ? "https" : "http";

    this.app.listen(config.port, () => {
      console.log(`Running on: ${protocol}://${hostname}:${config.port}`);
    });
  }
}

const server = new Server();
export default server;
