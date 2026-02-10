const meetingService = require("../service/meeting.service");

async function createMeeting(req, res, next) {
  try {
    const meeting = await meetingService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMeeting,
};
