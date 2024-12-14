import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gym_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;

