const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Theater = require('../models/Theater');
const User = require('../models/User');
const Showtime = require('../models/Showtime');
require('dotenv').config();

// Enhanced sample data based on your existing mockData
const sampleMovies = [
  {
    title: 'Avengers: Endgame',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.4,
    duration: 181,
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: new Date('2024-04-26'),
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
    director: 'Anthony Russo, Joe Russo',
    synopsis: 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.',
    trending: true
  },
  {
    title: 'Spider-Man: No Way Home',
    poster: 'https://images.pexels.com/photos/8241328/pexels-photo-8241328.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8241328/pexels-photo-8241328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.7,
    duration: 148,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    releaseDate: new Date('2024-12-17'),
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Jacob Batalon'],
    director: 'Jon Watts',
    synopsis: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
    trending: true,
    upcoming: true
  },
  {
    title: 'The Batman',
    poster: 'https://images.pexels.com/photos/8828409/pexels-photo-8828409.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8828409/pexels-photo-8828409.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 7.8,
    duration: 176,
    genre: ['Action', 'Crime', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: new Date('2024-03-04'),
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Jeffrey Wright', 'Colin Farrell'],
    director: 'Matt Reeves',
    synopsis: 'When a killer targets Gotham\'s elite with a series of sadistic machinations, a trail of cryptic clues sends the World\'s Greatest Detective on an investigation into the underworld.',
    trending: true
  },
  {
    title: 'Dune: Part Two',
    poster: 'https://images.pexels.com/photos/8134589/pexels-photo-8134589.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8134589/pexels-photo-8134589.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.5,
    duration: 166,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    releaseDate: new Date('2024-03-01'),
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Oscar Isaac'],
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    upcoming: true
  },
  {
    title: 'Top Gun: Maverick',
    poster: 'https://images.pexels.com/photos/8134545/pexels-photo-8134545.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8134545/pexels-photo-8134545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.3,
    duration: 130,
    genre: ['Action', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: new Date('2024-05-27'),
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
    director: 'Joseph Kosinski',
    synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission.',
    upcoming: true
  }
];

const sampleTheaters = [
  {
    name: 'CineMax Grand',
    location: 'Downtown Plaza, Mumbai',
    totalSeats: 120,
    showtimes: []
  },
  {
    name: 'PVR Phoenix',
    location: 'Phoenix Mall, Bangalore',
    totalSeats: 120,
    showtimes: []
  },
  {
    name: 'INOX City Centre',
    location: 'City Centre Mall, Delhi',
    totalSeats: 120,
    showtimes: []
  }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@moviebooking.com',
    password: 'admin123',
    phone: '+91-9876543210',
    isAdmin: true,
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+91-9876543211',
    isAdmin: false,
    role: 'user'
  }
];

const generateShowtimes = (movieId, theaterId) => {
  const times = ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'];
  const prices = [150, 180, 220, 250];
  
  return times.map((time, index) => ({
    movieId,
    theaterId,
    time,
    date: new Date(),
    price: prices[index],
    availableSeats: 120,
    totalSeats: 120,
    isActive: true
  }));
};

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set. Please check your .env file.');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await User.deleteMany({});
    await Showtime.deleteMany({});

    // Insert movies
    console.log('🎬 Inserting movies...');
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✅ ${movies.length} movies inserted`);

    // Insert theaters
    console.log(' Inserting theaters...');
    const theaters = await Theater.insertMany(sampleTheaters);
    console.log(`✅ ${theaters.length} theaters inserted`);

    // Insert users
    console.log(' Inserting users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ ${users.length} users inserted`);

    // Generate and insert showtimes
    console.log('🕐 Generating showtimes...');
    const showtimes = [];
    movies.forEach(movie => {
      theaters.forEach(theater => {
        const movieShowtimes = generateShowtimes(movie._id, theater._id);
        showtimes.push(...movieShowtimes);
      });
    });

    await Showtime.insertMany(showtimes);
    console.log(`✅ ${showtimes.length} showtimes inserted`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Movies: ${movies.length}`);
    console.log(`   Theaters: ${theaters.length}`);
    console.log(`   Users: ${users.length}`);
    console.log(`   Showtimes: ${showtimes.length}`);
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log(`   Email: admin@moviebooking.com`);
    console.log(`   Password: admin123`);
    
    mongoose.connection.close();
    console.log(' MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n Solution: Create a .env file in your server directory with:');
      console.log('   MONGODB_URI=mongodb+srv://movie_booking_user:Likhilbr@5432@YOUR_CLUSTER_URL/movie_booking?retryWrites=true&w=majority');
    }
    process.exit(1);
  }
};

seedDatabase();
