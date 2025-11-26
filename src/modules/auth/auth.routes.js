const router = require("express").Router();
const Authorization = require("../../common/guard/auth.guard");
const { sendOtpController, checkOtpController } = require("./auth.controller");

router.post("/send-otp", sendOtpController);
router.post("/check-otp", checkOtpController);
router.get("/whoami", Authorization, (req, res) => {
  res.json({
    error: null,
    data: req.user,
  });
});

module.exports = {
  authRoutes: router,
};
