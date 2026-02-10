const User = require("../model/user.model");

async function createUser(data) {
  const { name, email } = data;

  if (!name || !email) {
    const error = new Error("Name and email are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ name, email });
  return user;
}

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

module.exports = {
  createUser,
  getUserById,
};
