import express from 'express';
import { connectPrisma } from './db/prisma';
import { userRoutes } from './routes/userRoutes';
import { questRoutes } from './routes/questRoutes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', questRoutes);

const init = async () => {
    try {
        await connectPrisma();
        console.log('Prisma initialized');
    } catch (error) {
        console.error('Error initializing Prisma:', error);
    }
};

init();

app.listen(5000, () => console.log('Prisma server running on port 5000'));
