const express = require("express");
const app = express();
const dotenv = require("dotenv");
const crypto = require("crypto");
const exceptionError = require("./src/common/exceptions/all-exception");
const notFound = require("./src/common/exceptions/not-found");
dotenv.config();
const PORT = process.env.PORT;
const { AllRoutes } = require("./src/app.routes");
const swaggerConfig = require("./src/config/swagger.config");
const { syncModels } = require("./src/index.model");
syncModels()
  .then(() => {
    console.log(`Models Synced Successfully `);
  })
  .catch((err) => {
    console.log(`Syncs Error : ${err}`);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AllRoutes);

swaggerConfig(app);
exceptionError(app);
notFound(app);

app.listen(PORT, () => {
  console.log(`server tun : http://localhost:${PORT}`);
});
