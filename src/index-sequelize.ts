import express from 'express';
import { connectPostgres } from './db/sequalize';
import { User } from './sequalize/models/User';
import {Quest} from "./sequalize/models/Quest";
import {Question} from "./sequalize/models/Question";
import {userRoutes} from "./routes/userRoutes";
import {questRoutes} from "./routes/questRoutes";

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', questRoutes);

const init = async () => {
    try {
        await connectPostgres();
        await User.sync();
        await Quest.sync();
        await Question.sync();
        console.log('Sequelize models synced');
    } catch (error) {
        console.error('Error initializing Sequelize:', error);
    }
};

init();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
