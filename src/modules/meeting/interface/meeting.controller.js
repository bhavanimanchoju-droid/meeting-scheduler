const meetingService = require("../service/meeting.service");

async function createMeeting(req, res, next) {
  try {
    const meeting = await meetingService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
}

async function listMeetings(req, res, next) {
  try {
    const meetings = await meetingService.getMeetings(req.query);
    res.status(200).json(meetings);
  } catch (error) {
    next(error);
  }
}

async function getMeeting(req, res, next) {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    res.status(200).json(meeting);
  } catch (error) {
    next(error);
  }
}

async function updateMeeting(req, res, next) {
  try {
    const meeting = await meetingService.updateMeeting(
      req.params.id,
      req.body
    );
    res.status(200).json(meeting);
  } catch (error) {
    next(error);
  }
}

async function deleteMeeting(req, res, next) {
  try {
    await meetingService.deleteMeeting(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMeeting,
  listMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
