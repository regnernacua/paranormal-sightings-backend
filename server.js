import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { sightingsRouter } from './routes/sightings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1337;

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://paranormal-sightings-frontend.vercel.app'
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) 
      return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

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

//Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
