const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

class BasketCoupon extends Model {}
BasketCoupon.init(
  {
    basketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    couponId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "BasketCoupon",
    tableName: "basket_coupons",
  }
);
module.exports = BasketCoupon;
