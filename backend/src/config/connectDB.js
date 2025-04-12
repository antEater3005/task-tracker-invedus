import mongoose from 'mongoose';
import { MONGO_URI } from './index.js';

const connectDb = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};

export default connectDb;
