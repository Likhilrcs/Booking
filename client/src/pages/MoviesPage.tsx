import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { movies } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';

const MoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedMovie } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const genres = ['all', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];
  const languages = ['all', ...Array.from(new Set(movies.flatMap(movie => movie.language)))];

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
      const matchesLanguage = selectedLanguage === 'all' || movie.language.includes(selectedLanguage);
      
      return matchesSearch && matchesGenre && matchesLanguage;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchTerm, selectedGenre, selectedLanguage, sortBy]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSelectedLanguage('all');
    setSortBy('title');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#05668d] mb-4">
            Discover Movies
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our extensive collection of movies and book your tickets
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies, actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02c39a] focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="md:hidden mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-[#02c39a] text-white px-4 py-2 rounded-lg"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </motion.button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02c39a] focus:border-transparent outline-none"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02c39a] focus:border-transparent outline-none"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02c39a] focus:border-transparent outline-none"
                  >
                    <option value="title">Title (A-Z)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="releaseDate">Release Date (Newest)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Found {filteredAndSortedMovies.length} movie{filteredAndSortedMovies.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MovieCard
                movie={movie}
                onClick={() => handleMovieClick(movie)}
                showBookButton={true}
              />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No movies found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;