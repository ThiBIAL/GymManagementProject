import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserSubscription from './UserSubscription.js';
import Course from './Course.js';

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
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: '/avatar/default-avatar.png', // Chemin par défaut
    },
}, {
    timestamps: true,
});

// Associations
User.hasMany(UserSubscription, { foreignKey: 'userId', as: 'subscriptions' });
UserSubscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.belongsToMany(Course, { through: 'UserCourses', foreignKey: 'UserId' });
Course.belongsToMany(User, { through: 'UserCourses', foreignKey: 'CourseId' });

export default User;
