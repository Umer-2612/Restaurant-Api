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
  domainUrl: string;
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
    folderName: string;
  };
  stripeConfig: {
    secretKey: string;
    publishableKey: string;
    webhookSecretKey: string;
    redirectUrl: string;
  };
  nodeMailerConfig: {
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
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5000",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "http://umer-karachiwala.tech",
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
    "https://42ef-2409-40c1-500a-6ea2-e18d-8186-7fe1-bc30.ngrok-free.app",
  ],
  domainUrl: "http://localhost:5000",
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
    folderName: process.env.CLOUDINARY_FOLDER_NAME || "",
  },
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
    redirectUrl: process.env.STRIPE_REDIRECT_URL || "http://localhost:3001",
  },
  nodeMailerConfig: {
    outgoingServer: process.env.NODE_MAILER_OUTGOING_SERVER || "",
    outgoingServerSMTP: process.env.NODE_MAILER_SERVER_SMTP || "465",
    username: process.env.NODE_MAILER_USER || "",
    password: process.env.NODE_MAILER_PASS || "",
    userId: process.env.NODE_MAILER_USER_ID || "",
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
    "http://localhost:5000",
    "http://localhost:5001",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "http://umer-karachiwala.tech",
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
  ],
  domainUrl: "http://localhost:5000",
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
    folderName: process.env.CLOUDINARY_FOLDER_NAME || "",
  },
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
    redirectUrl: process.env.STRIPE_REDIRECT_URL || "http://localhost:3001",
  },
  nodeMailerConfig: {
    outgoingServer: process.env.NODE_MAILER_OUTGOING_SERVER || "",
    outgoingServerSMTP: process.env.NODE_MAILER_SERVER_SMTP || "465",
    username: process.env.NODE_MAILER_USER || "",
    password: process.env.NODE_MAILER_PASS || "",
    userId: process.env.NODE_MAILER_USER_ID || "",
  },
};

const prod: Config = {
  nodeEnv: "PRODUCTION",
  port: Number(process.env.PORT) || 3000,
  whiteList: [
    `http://localhost:${process.env.PORT || 3000}`,
    `http://127.0.0.1:${process.env.PORT || 3000}`,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://127.0.0.1:80",
    "http://localhost:5173",
    "http://localhost",
    "http://umer-karachiwala.tech",
    "https://umer-karachiwala.tech",
    "https://api.umer-karachiwala.tech",
    "http://api.umer-karachiwala.tech",
  ],
  domainUrl: "http://localhost:5000",
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
    folderName: process.env.CLOUDINARY_FOLDER_NAME || "",
  },
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
    redirectUrl: process.env.STRIPE_REDIRECT_URL || "http://localhost:3001",
  },
  nodeMailerConfig: {
    outgoingServer: process.env.NODE_MAILER_OUTGOING_SERVER || "",
    outgoingServerSMTP: process.env.NODE_MAILER_SERVER_SMTP || "465",
    username: process.env.NODE_MAILER_USER || "",
    password: process.env.NODE_MAILER_PASS || "",
    userId: process.env.NODE_MAILER_USER_ID || "",
  },
};

let env: Config;

switch (process.env.NODE_ENV) {
  case "PRODUCTION":
    env = prod;
    break;
  case "STAGING":
    env = staging;
    break;
  case "DEV":
  default:
    env = dev;
    break;
}

export default env;
