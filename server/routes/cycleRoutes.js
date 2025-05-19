// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createCycleEntry,
  getUserCycleEntries,
  getUserCycleEntry,
  deleteUserEntry,
  deleteUserCycleEntry,
} = require('../controllers/cycleController');


router.post('/', authMiddleware, createCycleEntry);
router.get('/', authMiddleware, getUserCycleEntries);
router.get('/:id', authMiddleware, getUserCycleEntry);
router.delete('/:id', authMiddleware, deleteUserCycleEntry)

module.exports = router;
