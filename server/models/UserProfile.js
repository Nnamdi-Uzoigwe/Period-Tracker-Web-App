const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One profile per user
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  cycleLength: {
    type: Number,
    required: true,
    min: 1
  },
  periodLength: {
    type: Number,
    required: true,
    min: 1
  }
}, 
    { timestamps: true }
);

modules.exports = mongoose.models.UserProfile || mongoose.model("UserProfile", UserProfileSchema); 