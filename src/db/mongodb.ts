import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/');
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export { connectMongo };
