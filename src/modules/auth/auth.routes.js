const { sendOtpController } = require("./auth.controller");
const { sendOtpController } = require("./auth.service");

const router = require("express").Router();

router.post("/send-otp", sendOtpController);
router.post("/check-otp", sendOtpController);

module.exports = {
  authRoutes: router,
};
