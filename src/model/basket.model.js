const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

class Basket extends Model {}
Basket.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Basket",
    tableName: "basket",
  }
);
module.exports = Basket;
