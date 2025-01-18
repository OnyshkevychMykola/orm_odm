import express from 'express';
import { connectPostgres } from './db/postgres';
import { connectMongo } from './db/mongodb';
import { User } from './models/User';
import { Quest } from './models/Quest';
import { Question } from './models/Question';

const app = express();

app.use(express.json());

const init = async () => {
    try {
        await connectPostgres();
        await connectMongo();

        await User.sync();
        await Quest.sync();
        await Question.sync();

        console.log('Models synced');
    } catch (error) {
        console.error('Error initializing databases and models:', error);
    }
};

init();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
