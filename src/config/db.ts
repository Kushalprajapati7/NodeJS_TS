import mongoose from 'mongoose';
 const connectDB = () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error('MongoDB URI is not provided.');
        throw new Error('MongoDB URI is not provided.');
    }

    try {
        mongoose.connect(mongoURI);
        console.log('Database Connected Suuccessfully ');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw new Error('Error connecting to database');
    }
};

export default connectDB