const express = require("express");
const router = express.Router();
const meetingController = require("../interface/meeting.controller");

router.post("/meetings", meetingController.createMeeting);

module.exports = router;
