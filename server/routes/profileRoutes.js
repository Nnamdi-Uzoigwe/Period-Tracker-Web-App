const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // adjust as needed

router.get('/', authMiddleware, profileController.getProfile);
router.post('/', authMiddleware, profileController.createProfile);
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;
