const Sequelize = require("sequelize");

const sequelize = new Sequelize("cartify-app", "root", "Eshaan@43", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
