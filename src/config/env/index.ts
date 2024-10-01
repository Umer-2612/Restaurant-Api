import dotenv from "dotenv";
dotenv.config();

interface Config {
  nodeEnv: string;
  port: number | string;
  whiteList: string[];
  sessionSecret: string;
  jwtConfig: {
    secretKey: string;
    expiryTime: string;
  };
  mongoDBConfig: {
    dbUrl: string;
    dbName: string;
    authenticate?: {
      dbUsername: string;
      dbPassword: string;
    };
  };
  googleConfig: {
    clientId: string;
    clientSecret: string;
  };
  mailerConfig: {
    outgoingServer: string;
    outgoingServerSMTP: string;
    username: string;
    password: string;
    userId: string;
  };
}

const dev: Config = {
  nodeEnv: "DEV",
  port: Number(process.env.PORT) || 3000,
  whiteList: [
    `http://localhost:${process.env.PORT || 3000}`,
    `http://127.0.0.1:${process.env.PORT || 3000}`,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5001",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
  ],
  sessionSecret: "umer",
  jwtConfig: {
    secretKey: "umer",
    expiryTime: "24h",
  },
  mongoDBConfig: {
    dbUrl: process.env.MONGO_DB_URI || "",
    dbName: process.env.MONGO_DB_NAME || "",
    authenticate: {
      dbUsername: process.env.MONGO_DB_USERNAME || "",
      dbPassword: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  googleConfig: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  mailerConfig: {
    outgoingServer: process.env.MAIL_HOST || "",
    outgoingServerSMTP: process.env.MAIL_PORT || "465" || "",
    username: process.env.MAIL_USER_NAME || "",
    password: process.env.MAIL_PASS || "",
    userId: process.env.MAIL_USER_ID || "",
  },
};

const staging: Config = {
  nodeEnv: "STAGING",
  port: Number(process.env.PORT) || 3000,
  whiteList: [
    `http://localhost:${process.env.PORT || 3000}`,
    `http://127.0.0.1:${process.env.PORT || 3000}`,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5001",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "https://stg.narad.io",
  ],
  sessionSecret: "umer",
  jwtConfig: {
    secretKey: "umer",
    expiryTime: "24h",
  },
  mongoDBConfig: {
    dbUrl: process.env.MONGO_URI || "",
    dbName: process.env.MONGO_DB_NAME || "",
    authenticate: {
      dbUsername: process.env.MONGO_DB_USERNAME || "",
      dbPassword: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  googleConfig: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  mailerConfig: {
    outgoingServer: process.env.MAIL_HOST || "",
    outgoingServerSMTP: process.env.MAIL_PORT || "465" || "",
    username: process.env.MAIL_USER_NAME || "",
    password: process.env.MAIL_PASS || "",
    userId: process.env.MAIL_USER_ID || "",
  },
};

const prod: Config = {
  nodeEnv: "PROD",
  port: Number(process.env.PORT) || 3000,
  whiteList: [
    `http://localhost:${process.env.PORT || 3000}`,
    `http://127.0.0.1:${process.env.PORT || 3000}`,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5001",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "https://stg.narad.io",
  ],
  sessionSecret: "umer",
  jwtConfig: {
    secretKey: "umer",
    expiryTime: "24h",
  },
  mongoDBConfig: {
    dbUrl: process.env.MONGO_URI || "",
    dbName: process.env.MONGO_DB_NAME || "",
    authenticate: {
      dbUsername: process.env.MONGO_DB_USERNAME || "",
      dbPassword: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  googleConfig: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  mailerConfig: {
    outgoingServer: process.env.MAIL_HOST || "",
    outgoingServerSMTP: process.env.MAIL_PORT || "465" || "",
    username: process.env.MAIL_USER_NAME || "",
    password: process.env.MAIL_PASS || "",
    userId: process.env.MAIL_USER_ID || "",
  },
};

let env: Config;

switch (process.env.NODE_ENV) {
  case "PROD":
    env = prod;
    break;
  case "QA":
    env = staging;
    break;
  case "DEV":
  default:
    env = dev;
    break;
}

export default env;
