import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export { connectMongo };
