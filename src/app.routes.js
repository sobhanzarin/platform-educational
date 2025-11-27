const router = require("express").Router();
const { authRoutes } = require("./modules/auth/auth.routes");
const { courseRotes } = require("./modules/course/course.routes");

// routes auth api
router.get("/", (req, res, next) => {
  res.send("OK");
});
router.use("/v1/api/auth", authRoutes);
router.use("/v1/api/course", courseRotes);

// routes corse api
module.exports = {
  AllRoutes: router,
};
