const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.config");

class Chapter extends Model {}

Chapter.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Chapter",
    tableName: "chapters",
  }
);

module.exports = Chapter;
