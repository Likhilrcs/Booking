const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Debug: Check if environment variables are loaded
console.log(' Environment Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not Set');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const connectDB = require('./config/database');

// Import routes
const movieRoutes = require('./routes/movies');
const theaterRoutes = require('./routes/theaters');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Booking API is running!',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      movies: '/api/movies',
      theaters: '/api/theaters',
      users: '/api/users',
      bookings: '/api/bookings'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: 'Connected to MongoDB Atlas'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(` API Base URL: http://localhost:${PORT}/api`);
});