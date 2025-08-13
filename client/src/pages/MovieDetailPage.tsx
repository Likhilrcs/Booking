import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Users, Play, MapPin, ArrowLeft } from 'lucide-react';
import { movies, theaters } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';
import { Showtime, Theater } from '../types';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedTheater, setSelectedShowtime } = useBooking();

  const movie = movies.find(m => m.id === id);

  // Generate mock showtimes for each theater
  const generateShowtimes = (theaterId: string): Showtime[] => {
    const times = ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'];
    const prices = [150, 180, 220, 250];
    
    return times.map((time, index) => ({
      id: `${theaterId}-${index + 1}`,
      time,
      price: prices[index],
      availableSeats: Math.floor(Math.random() * 50) + 10,
      movieId: id,
      theaterId,
      totalSeats: 120,
      isActive: true
    }));
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Movie not found</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/movies')}
            className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Movies
          </motion.button>
        </div>
      </div>
    );
  }

  const handleShowtimeSelect = (theater: Theater, showtime: Showtime) => {
    setSelectedMovie(movie);
    setSelectedTheater(theater);
    setSelectedShowtime(showtime);
    navigate('/seats');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-10 bg-white/80 backdrop-blur-sm text-[#028090] p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Movie Poster */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-xl shadow-2xl"
                />
              </motion.div>

              {/* Movie Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-center lg:text-left"
              >
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6 mb-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="font-bold">{movie.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="bg-[#02c39a] text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {movie.language.map((lang) => (
                    <span
                      key={lang}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-xl transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Synopsis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold text-[#05668d] mb-6">Synopsis</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {movie.synopsis}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#05668d] mb-3 flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Cast</span>
                  </h3>
                  <div className="space-y-2">
                    {movie.cast.slice(0, 4).map((actor) => (
                      <p key={actor} className="text-gray-700">{actor}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#05668d] mb-3">Director</h3>
                  <p className="text-gray-700">{movie.director}</p>
                </div>
              </div>
            </motion.div>

            {/* Movie Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#f0f3bd] to-white p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-[#05668d] mb-6">Movie Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-[#028090]">{movie.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold text-[#028090]">{movie.rating}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Date:</span>
                  <span className="font-semibold text-[#028090]">
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages:</span>
                  <span className="font-semibold text-[#028090]">
                    {movie.language.join(', ')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showtimes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#05668d] mb-4">Book Tickets</h2>
            <p className="text-gray-600 text-lg">Choose your preferred theater and showtime</p>
          </motion.div>

          <div className="space-y-8">
            {theaters.map((theater, theaterIndex) => {
              const showtimes = generateShowtimes(theater.id);
              return (
                <motion.div
                  key={theater.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: theaterIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#05668d] mb-2">{theater.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{theater.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {showtimes.map((showtime) => (
                      <motion.button
                        key={showtime.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShowtimeSelect(theater, showtime)}
                        className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                      >
                        <div className="font-bold text-lg">{showtime.time}</div>
                        <div className="text-sm opacity-90">₹{showtime.price}</div>
                        <div className="text-xs opacity-75">
                          {showtime.availableSeats} seats left
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailPage;