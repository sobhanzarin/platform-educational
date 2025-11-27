const { default: autoBind } = require("auto-bind");
const basket = require("../../model/basket.model");
const basketItem = require("../../model/basket-items.model");
const basketCoupon = require("../../model/basket-coupon.model");
const createHttpError = require("http-errors");
const { where } = require("sequelize");

class basketService {
  #basketModel;
  #basketItemModel;
  #basketCouponModel;
  constructor() {
    autoBind(this);
    this.#basketModel = basket;
    this.#basketItemModel = basketItem;
    this.#basketCouponModel = basketCoupon;
  }
  async addToBasket(userId, courseId) {
    const basket = await this.checkExistBasket(userId);

    // Todo check user course for already buy course in user courses
    await this.checkExistBasketItem(basket, courseId);
    return {
      message: "افزودن به سبد خرید با موفقیت بود",
    };
  }
  async deleteFromBasket(userId, courseId) {
    const basket = await this.#basketModel.findOne({ where: { userId } });
    if (!basket)
      throw createHttpError.BadRequest("سبد خریدی برای شما فعال نیست.!");
    // Todo check user course for already buy course in user courses
    const existItem = await this.#basketItemModel.findOne({
      where: {
        courseId,
        basketId: basket.dataValues.id,
      },
    });
    if (!existItem)
      throw createHttpError.BadRequest("دوره ای داخل سبدخرید شما وجود ندارد.");
    await this.#basketItemModel.destroy({ where: { courseId } });
    return {
      message: "حذف دوره با موفقیت بود.",
    };
  }

  async checkExistBasket(userId) {
    let basket = await this.#basketModel.findOne({ where: { userId } });
    if (!basket) {
      basket = await this.#basketModel.create({
        userId,
      });
    }
    return basket;
  }
  async checkExistBasketItem(basket, courseId) {
    const basketItem = await this.#basketItemModel.findOne({
      where: {
        courseId,
        basketId: basket.dataValues.id,
      },
    });
    if (basketItem)
      throw createHttpError.BadRequest("این دوره از قبل در سبد خرید می باشد.");
    return await this.#basketItemModel.create({
      courseId,
      basketId: basket.dataValues.id,
    });
  }
}

module.exports = new basketService();
