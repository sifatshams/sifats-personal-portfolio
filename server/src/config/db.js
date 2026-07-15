// @ts-nocheck
import mongoose from 'mongoose';

// .env
const mongo_uri = process.env.MONGO_URI;

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
