const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); // Enable CORS (simple and safe default)
app.use(express.json()); // Parse JSON requests

// --- API Routes ---
app.use('/api/orders', orderRoutes);

// --- Default & Health Routes ---
app.get('/', (req, res) => {
  res.send('✅ Backend API is running successfully!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend server is healthy and connected!',
    time: new Date().toISOString(),
  });
});

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // modern syntax, no deprecated options
    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// --- Start Server ---
const startServer = () => {
  // bind to 0.0.0.0 for Docker visibility
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

// Connect to the database and then start the server
connectDB().then(startServer);

