const { default: autoBind } = require("auto-bind");
const basketService = require("./basket.service");

class basketController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = basketService;
  }
  async addToBasket(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { courseId } = req.params;
      const result = await this.#service.addToBasket(userId, courseId);
      return res.json({
        error: null,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteFromBasket(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { courseId } = req.params;
      const result = await this.#service.deleteFromBasket(userId, courseId);
      return res.json({
        error: null,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new basketController();
