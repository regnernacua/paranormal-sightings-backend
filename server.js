import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { sightingsRouter } from './routes/sightings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// API routes
app.use('/api/sightings', sightingsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
