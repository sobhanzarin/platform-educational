const router = require("express").Router();
const basketController = require("./basket.controller");

router.get("/", (req, res) => {
  res.send("coming soon ....");
});
router.post("/:courseId", basketController.addToBasket);
router.delete("/:courseId", basketController.deleteFromBasket);

module.exports = {
  basketRouter: router,
};
