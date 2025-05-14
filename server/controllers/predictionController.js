// controllers/predictionController.js
const CycleEntry = require('../models/CycleEntry');
const Prediction = require('../models/Prediction');

exports.getLatestPrediction = async (req, res) => {
  try {
    const latestCycle = await CycleEntry.findOne({ userId: req.user.userId }).sort({ startDate: -1 });

    if (!latestCycle) {
      return res.status(404).json({ message: 'No cycle data found for prediction' });
    }

    const prediction = await Prediction.findOne({ cycleEntryId: latestCycle._id });

    if (!prediction) {
      return res.status(404).json({ message: 'No prediction found for latest cycle' });
    }

    res.json(prediction);
  } catch (err) {
    console.error('Prediction Fetch Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
