const { Op } = require('sequelize');
const Meeting = require('../model/meeting.model');
const User = require('../model/user.model');

async function createMeeting(data) {
    const { title, startTime, endTime, userId }= data;

    if (!title || !startTime || !endTime || !userId){
        const error  = new Error("All feilds are required");
        error.statusCode=400;
        throw error;
    }
    if (new Date(startTime) >= new Date(endTime)){
        const error= new Error("Start time must be before end time");
        error.statusCode=400;
        throw error;
    }
    const user = await User.findByPk(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const conflict = await Meeting.findOne({
        where: {
        userId,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
        },
    });

    if (conflict) {
        const error = new Error("Time slot already booked");
        error.statusCode = 400;
        throw error;
    }

    const meeting = await Meeting.create({
        title,
        startTime,
        endTime,
        userId,
    });

    return meeting;
    }
async function getMeetings(filters) {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.startDate && filters.endDate) {
    where.startTime = {
      [Op.gte]: filters.startDate,
    };
    where.endTime = {
      [Op.lte]: filters.endDate,
    };
  }

  return Meeting.findAll({ where });
}

async function getMeetingById(id) {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    const error = new Error("Meeting not found");
    error.statusCode = 404;
    throw error;
  }

  return meeting;
}

async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    const error = new Error("Meeting not found");
    error.statusCode = 404;
    throw error;
  }

  const startTime = data.startTime || meeting.startTime;
  const endTime = data.endTime || meeting.endTime;

  if (new Date(startTime) >= new Date(endTime)) {
    const error = new Error("Start time must be before end time");
    error.statusCode = 400;
    throw error;
  }

  const conflict = await Meeting.findOne({
    where: {
      userId: meeting.userId,
      id: { [Op.ne]: id },
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });

  if (conflict) {
    const error = new Error("Time slot already booked");
    error.statusCode = 400;
    throw error;
  }

  await meeting.update(data);
  return meeting;
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    const error = new Error("Meeting not found");
    error.statusCode = 404;
    throw error;
  }

  await meeting.destroy();
}

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
