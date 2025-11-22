const authRoutes = require("./modules/auth/auth.routes");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("OK");
});
router.use("/v1/api/auth", authRoutes);

module.exports = {
  AllRoutes: router,
};
