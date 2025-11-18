function notFound(app) {
  app.use((req, res, next) => {
    return res.status(404).json({
      data: null,
      error: {
        message: "Not Found Route",
      },
    });
  });
}

module.exports = notFound;
