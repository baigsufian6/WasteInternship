const express = require('express');
const availabilityController = require('../Controllers/availabilityController');
const authMiddleware = require('../Middleware/auth');

const router = express.Router();

router.use(authMiddleware); // Protect all availability routes

router.post('/', availabilityController.setAvailability);
router.get('/', availabilityController.getAvailability);
router.patch('/:id', availabilityController.updateAvailability);
router.delete('/:id', availabilityController.deleteAvailability);

module.exports = router;