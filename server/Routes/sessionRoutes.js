const express = require('express');
const sessionController = require('../Controllers/sessionController');
const authMiddleware = require('../Middleware/auth');

const router = express.Router();

router.use(authMiddleware); // Protect all session routes

router.post('/', sessionController.createSession);
router.get('/', sessionController.getSessions);
router.patch('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;