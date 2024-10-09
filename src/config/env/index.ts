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
  stripeConfig: {
    secretKey: string;
    publishableKey: string;
    webhookSecretKey: string;
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
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
  },
  nodeMailerConfig: {
    outgoingServer: process.env.NODE_MAILER_OUTGOING_SERVER || "",
    outgoingServerSMTP: process.env.NODE_MAILER_SERVER_SMTP || "465",
    username: process.env.NODE_MAILER_USER || "",
    password: process.env.NODE_MAILER_PASS || "",
    userId: process.env.NODE_MAILER_USER_ID || "",
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
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
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
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    webhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || "",
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
