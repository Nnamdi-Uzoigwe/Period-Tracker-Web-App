const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {  
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resetPasswordOtp: { 
    type: String, 
    default: null
  },
  resetPasswordOtpExpiry: { 
    type: Date, 
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
