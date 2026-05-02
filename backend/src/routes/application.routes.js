const express = require('express');
const router = express.Router();
const { submitApplication, getUserApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All application routes are protected

router.post('/', submitApplication);
router.get('/', getUserApplications);

module.exports = router;
