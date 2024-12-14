import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assurez-vous que ce chemin est correct

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('member', 'coach', 'admin'),
        allowNull: false,
    },
    abonnement: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
}, {
    timestamps: true,
});

export default User;
