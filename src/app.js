const express = require("express");
const sequelize = require("./config/database");

// load models & associations
require("./modules/meeting/model");

const meetingModule = require("./modules/meeting/index/index");

const app = express();

app.use(express.json());
app.use(meetingModule);

// global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

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

module.exports = app;
