const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

// @route   GET /api/universities/search
// @desc    Search universities
// @access  Public
router.get('/search', universityController.searchUniversities);
router.get('/compare', universityController.compareUniversities);

module.exports = router;
