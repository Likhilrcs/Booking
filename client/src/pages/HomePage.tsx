import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Calendar, Star } from 'lucide-react';
import { movies } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedMovie } = useBooking();
  const [currentSlide, setCurrentSlide] = useState(0);

  const trendingMovies = movies.filter(movie => movie.trending);
  const upcomingMovies = movies.filter(movie => movie.upcoming);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [trendingMovies.length]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative h-full">
              <img
                src={trendingMovies[currentSlide]?.backdrop}
                alt={trendingMovies[currentSlide]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4"
                    >
                      <span className="bg-gradient-to-r from-[#02c39a] to-[#00a896] px-4 py-2 rounded-full text-sm font-semibold">
                        Now Trending
                      </span>
                    </motion.div>
                    
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                    >
                      {trendingMovies[currentSlide]?.title}
                    </motion.h1>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-6 mb-6"
                    >
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{trendingMovies[currentSlide]?.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(trendingMovies[currentSlide]?.releaseDate || '').getFullYear()}</span>
                      </div>
                      <span>{trendingMovies[currentSlide]?.duration} min</span>
                    </motion.div>
                    
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg mb-8 text-gray-300 line-clamp-3"
                    >
                      {trendingMovies[currentSlide]?.synopsis}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex space-x-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMovieClick(trendingMovies[currentSlide])}
                        className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-xl transition-all duration-200"
                      >
                        <Play className="w-5 h-5" />
                        <span>Book Now</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMovieClick(trendingMovies[currentSlide])}
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
                      >
                        Watch Trailer
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {trendingMovies.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-[#02c39a]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Upcoming Movies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#05668d] mb-4">
              Upcoming Movies
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get ready for the most anticipated movies coming to theaters near you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {upcomingMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                  showBookButton={true}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/movies')}
              className="bg-gradient-to-r from-[#028090] to-[#05668d] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-200"
            >
              View All Movies
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-[#f0f3bd] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#05668d] mb-4">
              Why Choose CinemaHub?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Booking',
                description: 'Book your favorite movies in just a few clicks',
                icon: '🎬'
              },
              {
                title: 'Best Theaters',
                description: 'Premium theaters with the latest technology',
                icon: '🏢'
              },
              {
                title: 'Secure Payments',
                description: 'Safe and secure payment options',
                icon: '💳'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#05668d] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;