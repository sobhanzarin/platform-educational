const createHttpError = require("http-errors");
const authMessage = require("../../modules/auth/auth.message");
const jwt = require("jsonwebtoken");
const User = require("../../model/user.model");
const authService = require("../../modules/auth/auth.service");

const Authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || typeof authorization != "string") {
      throw createHttpError.Unauthorized(authMessage.loginAgain);
    }
    const [bearer, token] = authorization?.split(" ");
    if (!token || !bearer || bearer?.toLocaleLowerCase() != "bearer") {
      throw createHttpError.Unauthorized(authMessage.loginAgain);
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KET);
    if (decoded?.userId) {
      const user = await authService.checkExistUserById(decoded.userId);
      req.user = {
        id: user.id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        mobile: user?.mobile,
        avatar: user?.avatar,
        wallet_balance: user?.wallet_balance,
        status: user?.status,
      };
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = Authorization;
