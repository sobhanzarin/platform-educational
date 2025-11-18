const { default: autoBind } = require("auto-bind");
const AuthService = require("./auth.service");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtp(mobile) {}
  async sendOtp(mobile, codes) {}
}

module.exports = new AuthController();
