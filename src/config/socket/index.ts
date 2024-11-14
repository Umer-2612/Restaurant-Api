import { Server } from "socket.io";
import * as http from "http";

class SocketServer {
  private io: Server;

  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, {
      transports: ["websocket"],
      cors: {
        origin: "*", // Adjust as needed for security
      },
    });
  }

  // Getter for accessing the io instance
  public getIO(): Server {
    return this.io;
  }

  // You can add any custom event handling methods here
  public setupSocketIO() {
    this.io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
}

export default SocketServer;
