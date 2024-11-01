import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import textRoutes from './routes/TextRoutes';
import rateLimiter from './middlewares/rateLimiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api', textRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
