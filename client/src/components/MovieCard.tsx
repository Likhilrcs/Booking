import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  showBookButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, showBookButton = false }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {movie.trending && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            Trending
          </motion.div>
        )}
        
        {movie.upcoming && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-[#028090] to-[#05668d] text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            Coming Soon
          </motion.div>
        )}
        
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-semibold">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#05668d] mb-2 line-clamp-1 group-hover:text-[#028090] transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{movie.duration} min</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date(movie.releaseDate).getFullYear()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="bg-[#f0f3bd] text-[#028090] px-2 py-1 rounded-full text-xs font-medium"
            >
              {g}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {movie.language.map((lang) => (
            <span
              key={lang}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
        
        {showBookButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Book Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;