import User from './User.js';
import Course from './Course.js';

// Association Many-to-Many entre User et Course
User.belongsToMany(Course, { through: 'UserCourses', foreignKey: 'UserId' });
Course.belongsToMany(User, { through: 'UserCourses', foreignKey: 'CourseId' });

export default function associateModels() {
  console.log('Associations have been initialized');
}
