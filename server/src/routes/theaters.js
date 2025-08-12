const express = require('express');
const router = express.Router();
const Theater = require('../models/Theater');

// Get all theaters
router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ createdAt: -1 });
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.json(theater);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get theaters by location
router.get('/location/:location', async (req, res) => {
  try {
    const theaters = await Theater.find({
      location: { $regex: req.params.location, $options: 'i' }
    });
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
