import mongoose from 'mongoose';

const connectDB = async (url: string): Promise<void> => {
    try {
        const mongooseOptions = {
            socketTimeoutMS: 3600000,
            serverSelectionTimeoutMS: 3600000,
        }

        mongoose.set("strictQuery", true);
        mongoose.set("strictPopulate", false);

        await mongoose.connect(url, mongooseOptions);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

export default connectDB;