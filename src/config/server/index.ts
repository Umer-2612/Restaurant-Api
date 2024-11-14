import os from "os";
import express, { Application, Request, Response, NextFunction } from "express";
import config from "../env/index";
import Database from "../database/index";
import { ErrorHandler } from "../../utils/common-function";
import { setupMiddleware } from "../middleware/setup";
import Config from "../env/index";
import path from "path";
import * as http from "http";
import SocketServer from "../socket/index";

class Server {
  private app: Application;
  private database: Database;
  private httpServer: http.Server;
  private socketServer: SocketServer;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app); // Create HTTP server
    this.socketServer = new SocketServer(this.httpServer); // Initialize SocketServer
    this.start();
    this.database = new Database();
    this.socketServer.setupSocketIO(); // Set up Socket.IO handling
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

    this.httpServer.listen(config.port, () => {
      console.log(`Running on: ${protocol}://${hostname}:${config.port}`);
    });
  }

  // Method to access the Socket.IO instance
  public async getSocketIOInstance() {
    return this.socketServer.getIO(); // Get the Socket.IO instance from SocketServer
  }
}

const server = new Server();
export default server;
