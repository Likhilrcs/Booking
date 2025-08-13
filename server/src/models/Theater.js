const mongoose = require('mongoose');

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
  totalSeats: {
    type: Number,
    required: true,
    default: 120
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Theater', theaterSchema);