// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createCycleEntry,
  getUserCycleEntries,
} = require('../controllers/cycleController');


router.post('/', authMiddleware, createCycleEntry);
router.get('/', authMiddleware, getUserCycleEntries);

module.exports = router;
