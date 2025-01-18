import { connectPostgres } from './db/postgres';
import { connectMongo } from './db/mongodb';
import { User } from './models/User';
import { Quest } from './models/Quest';
import { Question } from './models/Question';

const init = async () => {
    await connectPostgres();
    await connectMongo();

    await User.sync();
    await Quest.sync();
    await Question.sync();

    console.log('Models synced');
};

init();
