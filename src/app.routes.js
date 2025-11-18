const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("OK");
});

module.exports = {
  AllRoutes: router,
};
