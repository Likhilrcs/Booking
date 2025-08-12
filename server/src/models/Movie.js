const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  genre: [{
    type: String,
    required: true
  }],
  language: [{
    type: String,
    required: true
  }],
  releaseDate: {
    type: Date,
    required: true
  },
  cast: [{
    type: String,
    required: true
  }],
  director: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  trending: {
    type: Boolean,
    default: false
  },
  upcoming: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
movieSchema.index({ title: 'text', genre: 'text', director: 'text' });

module.exports = mongoose.model('Movie', movieSchema);