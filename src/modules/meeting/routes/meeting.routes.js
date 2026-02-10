const express = require("express");
const router = express.Router();
const meetingController = require("../interface/meeting.controller");

router.post("/meetings", meetingController.createMeeting);
router.get("/meetings", meetingController.listMeetings);
router.get("/meetings/:id", meetingController.getMeeting);
router.put("/meetings/:id", meetingController.updateMeeting);
router.delete("/meetings/:id", meetingController.deleteMeeting);

module.exports = router;
