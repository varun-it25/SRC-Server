// config/db.js
import mongoose from 'mongoose';

// const MONGO_URL = process.env.MONGODB_URL 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://varun:varun123@filenow.zqt8i.mongodb.net/?retryWrites=true&w=majority&appName=filenow');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
