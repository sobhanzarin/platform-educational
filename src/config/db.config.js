const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_educational", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  logging: false,
});

module.exports = sequelize;
