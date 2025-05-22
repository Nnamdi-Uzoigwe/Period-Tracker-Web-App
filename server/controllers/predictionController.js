// controllers/predictionController.js
const CycleEntry = require('../models/CycleEntry');
const Prediction = require('../models/Prediction');
const mongoose = require("mongoose")

exports.getLatestPrediction = async (req, res) => {
  try {
    const latestCycle = await CycleEntry.findOne({ userId: req.user.userId }).sort({ startDate: -1 });

    if (!latestCycle) {
      console.log("❌ No cycle entry found");
      return res.status(404).json({ message: 'No cycle data found for prediction' });
    }

    console.log("✅ Latest Cycle Found:", latestCycle._id);

    const prediction = await Prediction.findOne({ cycleEntryId: latestCycle._id });

    if (!prediction) {
      console.log("❌ No prediction found for cycle:", latestCycle._id);
      return res.status(404).json({ message: 'No prediction found for latest cycle' });
    }

    console.log("✅ Prediction found:", prediction._id);
    res.json(prediction);
  } catch (err) {
    console.error('Prediction Fetch Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPredictionByCycleId = async (req, res) => {
  const { cycleId } = req.params;
  
  const cycleEntryId = new mongoose.Types.ObjectId(cycleId);

  try {
    const prediction = await Prediction.findOne({ cycleEntryId });

    if (!prediction) {
      return res.status(404).json({ message: 'No prediction found for this cycle log' });
    }

    res.json(prediction);
  } catch (err) {
    console.error('Error fetching prediction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


