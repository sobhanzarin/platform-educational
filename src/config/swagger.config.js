const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
dotenv.config();
const URL = process.env.URL_APP + process.env.PORT;

function swaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "educational-platform",
        description: "platform api developer",
        version: "1.0.0",
      },
      servers: [
        {
          url: URL,
        },
      ],
    },
    apis: [process.cwd() + "src/modules/**/*.swagger.js"],
  });

  app.use("/v1/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
}

module.exports = swaggerConfig;
