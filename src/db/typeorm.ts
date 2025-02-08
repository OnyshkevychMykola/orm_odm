import { DataSource } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

export const typeormDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '',
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASS || '',
    database: process.env.POSTGRES_DB || '',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    synchronize: true,
    logging: false,
    entities: ['src/typeorm/models/*.ts'],
});

export const connectTypeORM = async () => {
    try {
        await typeormDataSource.initialize();
        console.log('TypeORM connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting TypeORM:', error);
    }
};
