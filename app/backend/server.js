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
// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend (running on a different port) to communicate with this backend
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    const allowedOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
      : [];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


// Enable Express to parse JSON in the request body
app.use(express.json());

// --- API Routes ---
// Mount the order routes on the '/api/orders' path
app.use('/api/orders', orderRoutes);


// --- Database Connection ---
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    // Log any errors that occur during connection
    console.error('MongoDB connection failed:', error.message);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// --- Start Server ---
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Connect to the database and then start the server
connectDB().then(() => {
  startServer();
});
