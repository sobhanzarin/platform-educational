const { default: autoBind } = require("auto-bind");
const userModel = require("../../model/user.model");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createHttpError = require("http-errors");
const authMessage = require("./auth.message");
dotenv.config();
class AuthService {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = userModel;
  }
  async sendOtp(mobile) {
    const otp = randomInt(10000, 99999).toString();
    const expiration = new Date(Date.now() + 1000 * 60 * 2);
    const user = await this.#userModel.findOne({ where: { mobile } });
    if (!user) {
      await this.#userModel.create({
        mobile,
        otp_code: otp,
        otp_expires: expiration,
      });
    } else {
      user.otp_code = otp;
      user.otp_expires = expiration;
      await user.save();
    }
    return {
      message: authMessage.SendOtpSuccessfullt,
      otp,
    };
  }
  async checkOtp(mobile, otp) {
    const now = new Date();
    const user = await this.checkExistUser(mobile);
    console.log(now);

    if (user.ban_until && user.ban_until > now) {
      throw createHttpError.Unauthorized(authMessage.accountIsBan);
    }
    if (user.ban_until && user.ban_until <= now) {
      user.ban_until = null;
      user.wrong_count = 0;
      await user.save();
    }
    if (user.otp_expires < now) {
      user.wrong_count += 1;
      await user.save();
      throw createHttpError.Unauthorized(authMessage.otpCodeExpired);
    }
    if (user.otp_code !== otp) {
      user.wrong_count += 1;
      await user.save();
      throw createHttpError.Unauthorized(authMessage.otpIsIncorrect);
    }
    if (user.wrong_count >= 3) {
      user.ban_until = new Date(Date.now() + 1000 * 60 * 15);
      await user.save();
      throw createHttpError.Unauthorized(authMessage.accountBanned);
    }
    if (user.status == "pending") {
      user.status = "active";
    }
    user.wrong_count = 0;
    user.ban_until = null;
    await user.save();
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET_KET,
      { expiresIn: "1d" }
    );
    return {
      message: "",
      accessToken,
    };
  }

  async checkExistUser(mobile) {
    const user = await this.#userModel.findOne({ where: { mobile } });
    if (!user) throw new createHttpError.NotFound(authMessage.NotFound);
    return user;
  }
}

module.exports = new AuthService();
