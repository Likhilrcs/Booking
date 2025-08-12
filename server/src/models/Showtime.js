const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
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
  totalSeats: {
    type: Number,
    required: true,
    default: 120
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
showtimeSchema.index({ movieId: 1, theaterId: 1, date: 1, time: 1 });

module.exports = mongoose.model('Showtime', showtimeSchema);
