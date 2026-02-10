const sequelize = require("./config/database");
const User = require("./modules/meeting/model/user.model");

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error(error);
  }
}

start();
