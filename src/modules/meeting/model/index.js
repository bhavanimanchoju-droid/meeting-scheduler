const User = require("./user.model");
const Meeting = require("./meeting.model");

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Meeting,
};
