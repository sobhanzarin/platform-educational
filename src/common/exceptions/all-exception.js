function exceptionError(app) {
  app.use((err, req, res, next) => {
    return res.status(err.status ?? 500).json({
      data: null,
      error: {
        message: err?.message || "internal server error",
      },
    });
  });
}

module.exports = exceptionError;
