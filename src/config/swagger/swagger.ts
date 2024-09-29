import swaggerJsDoc from "swagger-jsdoc";
import os from "os";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { problemSetSchema } from "../../components/problem-sets/swagger/schema";
import { problemSetPath } from "../../components/problem-sets/swagger/path";
import Config from "../env/index";

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for our system",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      ...problemSetSchema,
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

// Aggregate paths
const paths = {
  ...problemSetPath,
};

// Swagger options
const swaggerOptions = {
  swaggerDefinition,
  apis: [],
  paths, // Load paths here
};

// Initialize Swagger
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger docs
export const setupSwaggerDocs = (app: Application) => {
  const hostname = Config.nodeEnv === "PROD" ? os.hostname() : "localhost";
  const protocol = Config.nodeEnv === "PROD" ? "https" : "http";

  const docsUrl = `${protocol}://${hostname}:${Config.port}/api-docs`;

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at ${docsUrl}`);
};
