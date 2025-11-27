const sequelize = require("./config/db.config");
const Chapter = require("./model/chapter.model");
const Course = require("./model/course.model");
const User = require("./model/user.model");
const Episode = require("./model/episode.model");
const Basket = require("./model/basket.model");
const BasketItem = require("./model/basket-items.model");
const BasketCoupon = require("./model/basket-coupon.model");

// Course -> chapter
Course.hasMany(Chapter, {
  foreignKey: "courseId",
  as: "chapters",
});
Chapter.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// Chapter -> Episode
Chapter.hasMany(Episode, {
  foreignKey: "chapterId",
  as: "episodes",
  onDelete: "CASCADE",
});

Episode.belongsTo(Chapter, {
  foreignKey: "chapterId",
  as: "chapter",
  onDelete: "CASCADE",
});

// user -> course
User.hasMany(Course, {
  foreignKey: "teacherId",
  as: "courses",
  onDelete: "SET NULL",
});
Course.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
  onDelete: "SET NULL",
});

// Basket , item, Coupon
User.hasOne(Basket, {
  foreignKey: "userId",
  as: "basket",
  onDelete: "CASCADE",
});
Basket.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Basket - Basket items
Basket.hasMany(BasketItem, {
  foreignKey: "basketId",
  as: "items",
});
BasketItem.belongsTo(Basket, {
  foreignKey: "basketId",
  as: "basket",
});

// Basket - Basket coupon
Basket.hasMany(BasketCoupon, {
  foreignKey: "basketId",
  as: "coupons",
  onDelete: "CASCADE",
});
BasketCoupon.belongsTo(Basket, {
  foreignKey: "basketId",
  as: "basket",
});
Course.hasMany(BasketItem, {
  foreignKey: "courseId",
  as: "basket",
  onDelete: "CASCADE",
});
BasketItem.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  syncModels,
  Course,
  Chapter,
  Episode,
};
