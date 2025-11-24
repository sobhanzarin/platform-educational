const router = require("express").Router();
const { authRoutes } = require("./modules/auth/auth.routes");

router.get("/", (req, res, next) => {
  res.send("OK");
});
router.use("/v1/api/auth", authRoutes);

module.exports = {
  AllRoutes: router,
};
