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
      },
      env_staging: {
        PORT: process.env.PORT || 8000,
        NODE_ENV: "STAGING",
        MONGO_DB_URI: process.env.MONGO_DB_URI || "",
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
        MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "",
        MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
      },
      env_production: {
        PORT: process.env.PORT || 8000,
        NODE_ENV: "PRODUCTION",
        MONGO_DB_URI: process.env.MONGO_DB_URI || "",
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
        MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "",
        MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
      },
    },
  ],
};
