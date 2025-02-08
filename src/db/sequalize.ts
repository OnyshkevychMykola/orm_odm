import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
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
