const router = require("express").Router();
const { sendOtpController, checkOtpController } = require("./auth.controller");

router.post("/send-otp", sendOtpController);
router.post("/check-otp", checkOtpController);

module.exports = {
  authRoutes: router,
};
