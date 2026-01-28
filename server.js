import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { sightingsRouter } from './routes/sightings.js';

dotenv.config();

const app = express();
const PORT = 7000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api/sightings', sightingsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
