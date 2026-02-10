const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/user.routes");
const meetingRoutes = require("../routes/meeting.routes");

// aggregate all module routes
router.use(userRoutes);
router.use(meetingRoutes);

module.exports = router;
