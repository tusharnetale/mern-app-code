import { config } from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/db.js';  // Assuming connectDB handles the DB connection
import transactionRoutes from './routes/transactions.js';
import cors from 'cors';

// Load environment variables from .env file
config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
