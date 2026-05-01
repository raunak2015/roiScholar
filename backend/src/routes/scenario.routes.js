const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');
const { protect } = require('../middlewares/auth.middleware'); // Assuming you have auth middleware

router.use(protect); // All scenario routes are protected

router.post('/', scenarioController.saveScenario);
router.get('/', scenarioController.getUserScenarios);
router.delete('/:id', scenarioController.deleteScenario);

module.exports = router;
