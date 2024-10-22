require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "restaurant-api", // Name of your app
      script: "./build/config/server/index.js", // Path to your entry point
      instances: 1, // Number of instances (use 'max' for all cores)
      exec_mode: "fork", // Fork mode (or 'cluster' mode for scaling)
      env: {
        PORT: process.env.PORT || 3000,
        NODE_ENV: "DEV",
        MONGO_DB_URI: process.env.MONGO_DB_URI || "",
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
        MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "",
        MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_CLOUD_NAME: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_KEY: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_SECRET: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_FOLDER_NAME: process.env.MONGO_DB_PASSWORD || "",
        NODE_MAILER_OUTGOING_SERVER:
          process.env.NODE_MAILER_OUTGOING_SERVER || "",
        NODE_MAILER_USER: process.env.NODE_MAILER_USER || "",
        NODE_MAILER_PASS: process.env.NODE_MAILER_PASS || "",
        NODE_MAILER_USER_ID: process.env.NODE_MAILER_USER_ID || "",
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
      },
      env_staging: {
        PORT: process.env.PORT || 8000,
        NODE_ENV: "STAGING",
        MONGO_DB_URI: process.env.MONGO_DB_URI || "",
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
        MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "",
        MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_CLOUD_NAME: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_KEY: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_SECRET: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_FOLDER_NAME: process.env.MONGO_DB_PASSWORD || "",
        NODE_MAILER_OUTGOING_SERVER:
          process.env.NODE_MAILER_OUTGOING_SERVER || "",
        NODE_MAILER_USER: process.env.NODE_MAILER_USER || "",
        NODE_MAILER_PASS: process.env.NODE_MAILER_PASS || "",
        NODE_MAILER_USER_ID: process.env.NODE_MAILER_USER_ID || "",
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
      },
      env_production: {
        PORT: process.env.PORT || 8000,
        NODE_ENV: "PRODUCTION",
        MONGO_DB_URI: process.env.MONGO_DB_URI || "",
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
        MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "",
        MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_CLOUD_NAME: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_KEY: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_API_SECRET: process.env.MONGO_DB_PASSWORD || "",
        CLOUDINARY_FOLDER_NAME: process.env.MONGO_DB_PASSWORD || "",
        NODE_MAILER_OUTGOING_SERVER:
          process.env.NODE_MAILER_OUTGOING_SERVER || "",
        NODE_MAILER_USER: process.env.NODE_MAILER_USER || "",
        NODE_MAILER_PASS: process.env.NODE_MAILER_PASS || "",
        NODE_MAILER_USER_ID: process.env.NODE_MAILER_USER_ID || "",
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
      },
    },
  ],
};
