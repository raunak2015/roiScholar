const express = require('express');
const router = express.Router();
const { submitApplication, getUserApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.use(protect); // All application routes are protected

router.post('/', upload.array('documents', 5), submitApplication);
router.get('/', getUserApplications);

module.exports = router;
