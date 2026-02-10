const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "meeting_scheduler",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
