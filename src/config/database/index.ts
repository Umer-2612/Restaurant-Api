import mongoose, { Connection } from "mongoose";
import config from "../env/index";

class Database {
  private connection: Connection | undefined;

  constructor() {
    this.connection = undefined;
  }

  async connect(): Promise<void> {
    try {
      const connectOptions: mongoose.ConnectOptions = {
        dbName: config.mongoDBConfig.MONGODB_DB_MAIN,
      };

      if (config.mongoDBConfig.authenticate) {
        connectOptions.user = config.mongoDBConfig.authenticate.username;
        connectOptions.pass = config.mongoDBConfig.authenticate.password;
      }

      const MONGO_URI: string = `${config.mongoDBConfig.MONGODB_URI}`;

      this.connection = mongoose.connection;

      this.connection.on("connecting", () => {
        console.log("MongoDB :: connecting");
      });

      this.connection.on("error", (error) => {
        console.log(`MongoDB :: connection ${error}`);
        mongoose.disconnect();
      });

      this.connection.on("connected", () => {
        console.log("MongoDB :: connected");
      });

      this.connection.on("reconnected", () => {
        console.log("MongoDB :: reconnected");
      });

      this.connection.on("reconnectFailed", () => {
        console.log("MongoDB :: reconnectFailed");
      });

      this.connection.on("disconnected", () => {
        console.log("MongoDB :: disconnected");
      });

      this.connection.on("fullsetup", () => {
        console.log("MongoDB :: reconnecting... %d");
      });

      await mongoose.connect(MONGO_URI, connectOptions);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      throw error;
    }
  }
}

export default Database;
