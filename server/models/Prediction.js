const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  cycleEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CycleEntry',
    required: true,
  },
  nextPeriod: {
    type: Date,
    required: true,
  },
  ovulationDate: {
    type: Date,
    required: true,
  },
  fertileStart: {
    type: Date,
    required: true,
  },
  fertileEnd: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prediction', predictionSchema);
