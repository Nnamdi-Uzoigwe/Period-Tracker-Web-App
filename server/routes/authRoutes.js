const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendResetOtp, verifyOtp, resetPassword} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-otp', sendResetOtp); 
router.post('/verify-otp', verifyOtp);       
router.post('/reset-password', resetPassword);
module.exports = router;
