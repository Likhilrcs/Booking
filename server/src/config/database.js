const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set. Please check your .env file.');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Remove deprecated options
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log(' MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n Solution: Create a .env file in your server directory with:');
      console.log('MONGODB_URI=mongodb+srv://movie_booking_user:Likhilbr5432@cluster0.igp9bgg.mongodb.net/movie_booking?retryWrites=true&w=majority&appName=Cluster0');
    }
    process.exit(1);
  }
};

module.exports = connectDB;