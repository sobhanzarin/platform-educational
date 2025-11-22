const { default: autoBind } = require("auto-bind");
const AuthService = require("./auth.service");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtpController(req, res, next) {
    try {
      const mobile = req.body;
      const result = await this.#service.sendOtp(mobile);
      return res.json({
        error: null,
        result,
      });
    } catch (error) {
      if (error) next(error);
    }
  }
  async sendOtpController(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const result = await this.#service.checkOtp(mobile, code);
      return {
        error: null,
        result,
      };
    } catch (error) {
      if (error) next(error);
    }
  }
}

module.exports = new AuthController();
