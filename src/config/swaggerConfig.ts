import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const options: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PLD Backend",
      version: "1.0.0",
      description: "API documentation for Pure Light Diamond",
    },
    servers: [
      {
        description: process.env.NODE_ENV + " Server",
        url: process.env.SERVER_BASE_URL || "http://localhost:7500/api/v1", // Use env variable or fallback
      },
      {
        description: "Core Server",
        url: "http://localhost:7500",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "API for managing users",
      },
      {
        name: "Authentication",
        description: "APIs for authentication",
      },
      // Add more tags as needed
    ],
  },
  apis: ["./src/routes/*.ts", "./src/routes/inventory/*.ts"], // Path to your route files for API documentation
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
