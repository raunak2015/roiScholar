const express = require('express');
const router = express.Router();
const { calculateLoan, saveLoan } = require('../controllers/loanController');
const { protect } = require('../middleware/auth.middleware');

router.post('/calculate', calculateLoan);
router.post('/save', protect, saveLoan);

module.exports = router;
