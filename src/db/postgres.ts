import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: '',
    password: '',
    database: '',
});

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully.');
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
    }
};

export { sequelize, connectPostgres };
