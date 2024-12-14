import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startCourse: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endCourse: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    courseDifficulty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coachName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Course;
