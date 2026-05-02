const express = require('express');
const router = express.Router();
const { getScholarships } = require('../controllers/scholarshipController');

router.get('/', getScholarships);

module.exports = router;
