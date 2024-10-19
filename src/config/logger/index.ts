import { createLogger, transports } from "winston";
import * as rfs from "rotating-file-stream";

// Create a rotating file stream for logs
const createRotatingStream = (filename: any) => {
  return rfs.createStream(filename, {
    interval: "1d", // Rotate daily
    path: "./logs", // Directory for logs
    size: "5M", // Rotate log when the size exceeds 5 MB
    maxFiles: 10, // Keep at most 10 rotated files
    initialRotation: true,
  });
};

// Create a Winston logger
const logger = createLogger({
  level: "info",
  transports: [
    new transports.Stream({
      stream: createRotatingStream("app.log"),
      level: "info",
      handleExceptions: true,
    }),
    new transports.Stream({
      stream: createRotatingStream("error.log"),
      level: "error",
      handleExceptions: true,
    }),
  ],
});

export default logger;
