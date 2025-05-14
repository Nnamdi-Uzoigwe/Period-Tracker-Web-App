const mongoose = require('mongoose');

const cycleEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  cycleLength: {
    type: Number,
    required: true,
  },
  periodLength: {
    type: Number,
    required: true,
  },
  symptoms: {
    type: [String],
    default: [],
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CycleEntry', cycleEntrySchema);
