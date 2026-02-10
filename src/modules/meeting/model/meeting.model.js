const { DataTypes } = require('sequelize');
const sequelize= require('../../../config/database');

const Meeting= sequelize.define(
    "Meeting",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull : false,
        },
        startTime: {
            type:DataTypes.DATE,
            allowNull:false,
        },
        endTime:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        tableName:"meetings",
        timestamps:true,
        indexes:[
            {
                fields:["userId"]
            },
            {
                fields:["startTime", "endTime"]
            },
        ],
    }
);

module.exports=Meeting;