import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserSubscription = sequelize.define('UserSubscription', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    subscriptionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'SubscriptionTypes',
            key: 'id',
        },
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Courses',
            key: 'id',
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default UserSubscription;
