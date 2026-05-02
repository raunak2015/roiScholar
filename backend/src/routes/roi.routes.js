const express = require('express');
const router = express.Router();
const { getSalaryData } = require('../controllers/roiController');

router.get('/salary-data', getSalaryData);

module.exports = router;
