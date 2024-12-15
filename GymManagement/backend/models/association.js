import User from './User.js';
import Course from './Course.js';

// Définir les relations many-to-many via une table intermédiaire
User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });

// Exporter les modèles si nécessaire
export default { User, Course };
