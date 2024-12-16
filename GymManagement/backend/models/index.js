import sequelize from '../config/database.js';
import User from './User.js';
import Course from './Course.js';
import SubscriptionType from './SubscriptionType.js';
import UserSubscription from './UserSubscription.js';

// Configurer les relations entre les modèles
User.hasMany(UserSubscription, { foreignKey: 'userId' });
UserSubscription.belongsTo(User, { foreignKey: 'userId' });

SubscriptionType.hasMany(UserSubscription, { 
    foreignKey: 'subscriptionTypeId',
    as: 'userSubscriptions', // Alias cohérent
});
UserSubscription.belongsTo(SubscriptionType, { 
    foreignKey: 'subscriptionTypeId',
    as: 'subscriptionType', // Alias pour la relation inverse
});

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
