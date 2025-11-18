const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../../config/db.config");

class User extends Model {}

User.init({
  firstname: { type: DataTypes.STRING },
  lastname: { type: DataTypes.STRING },
  mobile: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING },
  wallet_balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  wallet_balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
});

module.exports = User;
