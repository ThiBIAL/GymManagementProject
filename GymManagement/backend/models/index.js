import sequelize from '../config/database.js';
import User from './User.js';
import Course from './Course.js';
import SubscriptionType from './SubscriptionType.js';
import UserSubscription from './UserSubscription.js';

// Définir les relations entre modèles
User.hasMany(UserSubscription, { foreignKey: 'userId' });
UserSubscription.belongsTo(User, { foreignKey: 'userId' });

SubscriptionType.hasMany(UserSubscription, { foreignKey: 'subscriptionTypeId' });
UserSubscription.belongsTo(SubscriptionType, { foreignKey: 'subscriptionTypeId' });

Course.hasMany(UserSubscription, { foreignKey: 'courseId' });
UserSubscription.belongsTo(Course, { foreignKey: 'courseId' });

export {
    sequelize,
    User,
    Course,
    SubscriptionType,
    UserSubscription,
};

export default {
    sequelize,
    User,
    Course,
    SubscriptionType,
    UserSubscription,
};