const router = require("express").Router();
const Authorization = require("./common/guard/auth.guard");
const { authRouter } = require("./modules/auth/auth.routes");
const { basketRouter } = require("./modules/basket/basket.routes");
const { courseRoter } = require("./modules/course/course.routes");

// routes auth api
router.get("/", (req, res, next) => {
  res.send("OK");
});
router.use("/v1/api/auth", authRouter);
router.use("/v1/api/course", Authorization, courseRoter);
router.use("/v1/api/basket", Authorization, basketRouter);

// routes corse api
module.exports = {
  AllRoutes: router,
};
