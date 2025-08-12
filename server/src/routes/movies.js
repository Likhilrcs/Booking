const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

// Public routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Protected routes (admin only)
router.post('/', authenticateToken, requireAdmin, createMovie);
router.put('/:id', authenticateToken, requireAdmin, updateMovie);
router.delete('/:id', authenticateToken, requireAdmin, deleteMovie);

module.exports = router;
