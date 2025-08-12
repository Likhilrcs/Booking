const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  }
}, {
  timestamps: true
});

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  showtimes: [showtimeSchema],
  totalSeats: {
    type: Number,
    required: true,
    default: 120
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Theater', theaterSchema);