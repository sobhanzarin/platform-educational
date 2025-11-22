const { default: autoBind } = require("auto-bind");
const userModel = require("../../model/user.model");
const { randomInt } = require("crypto");
const createHttpError = require("http-errors");
const authMessage = require("./auth.message");
const User = require("../../model/user.model");

class AuthService {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = userModel;
  }
  async sendOtp(mobile) {
    const otp = randomInt(10000, 99999);
    const expiration = new Date(Date.now() + 1000 * 60 * 2);
    const user = await this.checkExistUser(mobile);
    if (!user) {
      await this.#userModel.create({
        mobile,
        otp_code: otp,
        otp_expires: expiration,
      });
    } else {
      this.#userModel.otp_code = otp;
      this.#userModel.otp_expires = expiration;
      await this.#userModel.save();
    }
    return {
      message: authMessage.SendOtpSuccessfullt,
      otp,
    };
  }
  async checkOtp(mobile, otp) {}
  async checkExistUser(mobile) {
    const user = await this.#userModel.findOne({ where: mobile });
    if (!user) throw new createHttpError.NotFound(authMessage.NotFound);
    return user;
  }
}

module.exports = new AuthService();
