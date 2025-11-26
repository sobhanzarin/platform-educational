const { validationResult } = require("express-validator");

function validation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: "validator error",
        errors: errors.array().map((err) => err.msg),
      },
      data: null,
    });
  }
  return next();
}

module.exports = validation;
