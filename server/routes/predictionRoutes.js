// routes/predictionRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLatestPrediction, getPredictionByCycleId } = require('../controllers/predictionController');

// @route   GET /api/prediction/latest
// @desc    Get the latest prediction for the logged-in user
router.get('/latest', authMiddleware, getLatestPrediction);
router.get('/:cycleId', authMiddleware, getPredictionByCycleId);
module.exports = router;
