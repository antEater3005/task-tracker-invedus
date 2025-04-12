import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import connectDb from './config/connectDB.js';
import morgan from 'morgan';
import taskRouter from './routes/taskRoutes.js';
const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  // Connect to database
  connectDb();

  app.use('/api/auth', authRouter);
  app.use('/api/tasks', taskRouter);

  app
    .listen('5000', () => {
      console.log(`Listening to port 5000...`);
    })
    .on('error', (error) => {
      console.error(error);
      process.exit(1);
    });
};

startServer();
