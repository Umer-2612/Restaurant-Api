import dotenv from "dotenv";
dotenv.config();

interface Config {
  nodeEnv: string;
  port: number | string;
  whiteList: string[];
  jwtConfig: {
    secretKey: string;
    accessTokenExpiryTime: string;
    refreshTokenExpiryTime: string;
  };
  mongoDBConfig: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
    authenticate?: {
      username: string;
      password: string;
    };
  };
  cloudinaryConfig: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
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
    "http://localhost:5000",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
  ],
  jwtConfig: {
    secretKey: "xjfqktewbghncmayzoipsvuldr",
    accessTokenExpiryTime: "24h",
    refreshTokenExpiryTime: "72h",
  },
  mongoDBConfig: {
    MONGODB_URI: process.env.MONGO_URI || "",
    MONGODB_DB_MAIN: process.env.MONGO_DB_NAME || "",
    authenticate: {
      username: process.env.MONGO_DB_USER || "",
      password: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

const qa: Config = {
  nodeEnv: "QA",
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
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
  ],
  jwtConfig: {
    secretKey: "xjfqktewbghncmayzoipsvuldr",
    accessTokenExpiryTime: "24h",
    refreshTokenExpiryTime: "72h",
  },
  mongoDBConfig: {
    MONGODB_URI: process.env.MONGO_URI || "",
    MONGODB_DB_MAIN: process.env.MONGO_DB_NAME || "",
    authenticate: {
      username: process.env.MONGO_DB_USER || "",
      password: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
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
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
  ],
  jwtConfig: {
    secretKey: "xjfqktewbghncmayzoipsvuldr",
    accessTokenExpiryTime: "24h",
    refreshTokenExpiryTime: "72h",
  },
  mongoDBConfig: {
    MONGODB_URI: process.env.MONGO_URI || "",
    MONGODB_DB_MAIN: process.env.MONGO_DB_NAME || "",
    authenticate: {
      username: process.env.MONGO_DB_USER || "",
      password: process.env.MONGO_DB_PASSWORD || "",
    },
  },
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

let env: Config;

switch (process.env.NODE_ENV) {
  case "PROD":
    env = prod;
    break;
  case "QA":
    env = qa;
    break;
  case "DEV":
  default:
    env = dev;
    break;
}

export default env;
