const router = require("express").Router();
const Authorization = require("./common/guard/auth.guard");
const { authRoutes } = require("./modules/auth/auth.routes");
const { courseRotes } = require("./modules/course/course.routes");

// routes auth api
router.get("/", (req, res, next) => {
  res.send("OK");
});
router.use("/v1/api/auth", authRoutes);
router.use("/v1/api/course", Authorization, courseRotes);

// routes corse api
module.exports = {
  AllRoutes: router,
};
