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

    module.exports = {
    createMeeting,
    };
