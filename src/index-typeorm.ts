import express from 'express';
import { connectTypeORM } from './db/typeorm';
import {userRoutes} from "./routes/userRoutes";
import {questRoutes} from "./routes/questRoutes";

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', questRoutes);

const init = async () => {
    try {
        await connectTypeORM();
        console.log('TypeORM initialized');
    } catch (error) {
        console.error('Error initializing TypeORM:', error);
    }
};

init();

app.listen(5000, () => console.log('TypeORM server running on port 5000'));
