import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SubscriptionType = sequelize.define('SubscriptionType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default SubscriptionType;
