// controllers/cycleController.js
const CycleEntry = require('../models/CycleEntry');
const Prediction = require('../models/Prediction');
const mongoose = require('mongoose');

// Utility function to calculate prediction based on cycle info
const calculatePrediction = (startDate, pastCycleLengths = [], lutealPhaseLength = 14) => {
  if (!pastCycleLengths.length) {
    throw new Error("You must provide at least one cycle length.");
  }

  const averageCycle = Math.round(
    pastCycleLengths.reduce((sum, length) => sum + length, 0) / pastCycleLengths.length
  );

  const cycleVariance = pastCycleLengths.length > 1
    ? Math.max(...pastCycleLengths) - Math.min(...pastCycleLengths)
    : 0;

  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(nextPeriod.getDate() + averageCycle);

  const ovulationDate = new Date(nextPeriod);
  ovulationDate.setDate(ovulationDate.getDate() - lutealPhaseLength);

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 4);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const rangeBuffer = Math.ceil(cycleVariance / 2);

  const ovulationRangeStart = new Date(ovulationDate);
  ovulationRangeStart.setDate(ovulationDate.getDate() - rangeBuffer);

  const ovulationRangeEnd = new Date(ovulationDate);
  ovulationRangeEnd.setDate(ovulationDate.getDate() + rangeBuffer);

  return {
    averageCycle,
    cycleVariance,
    nextPeriod,
    ovulationDate,
    fertileStart,
    fertileEnd,
    ovulationRange: {
      start: ovulationRangeStart,
      end: ovulationRangeEnd,
    },
  };
};

exports.createCycleEntry = async (req, res) => {
  try {
    const { startDate, cycleLength, periodLength, symptoms, notes } = req.body;

    const newCycle = new CycleEntry({
      userId: req.user.userId,
      startDate,
      cycleLength,
      periodLength,
      symptoms,
      notes,
    });

    await newCycle.save();

    // Fetch past cycles (including the new one), limit to last 5 for reasonable average
    const pastCycles = await CycleEntry.find({ userId: req.user.userId }).sort({ startDate: -1 }).limit(5);

    const cycleLengths = pastCycles.map(cycle => cycle.cycleLength);

    // Now pass array of cycle lengths
    const predictionData = calculatePrediction(new Date(startDate), cycleLengths);

    const prediction = new Prediction({
      cycleEntryId: newCycle._id,
      ...predictionData,
    });

    await prediction.save();

    res.status(201).json({
      message: 'Cycle entry and prediction created successfully',
      cycle: newCycle,
      prediction,
    });
  } catch (err) {
    console.error('Cycle Entry Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Function to get all cycle entries for the logged-in user
exports.getUserCycleEntries = async (req, res) => {
  try {
    console.log('Decoded userId:', req.user.userId); 
    const cycleEntries = await CycleEntry.find({ userId: req.user.userId });
    res.status(200).json(cycleEntries);
  } catch (err) {
    console.error('Error fetching cycle entries:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// exports.getUserCycleEntry = async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: 'Invalid ID format' });
//     }

//     const entry = await CycleEntry.findOne({
//       _id: req.params.id,
//       user: req.user.userId 
//     });

//     if (!entry) {
//       return res.status(404).json({ message: 'Cycle entry not found' });
//     }

//     // 3. Return the found entry
//     res.status(200).json(entry);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// controllers/cyclesController.js
exports.getUserCycleEntry = async (req, res) => {
  try {
    // Validate MongoDB ID format
    console.log(req.params.id)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const entry = await CycleEntry.findOne({
      _id: req.params.id,
      userId: req.user.userId // Ensure user owns this entry
    }).lean();

    if (!entry) {
      return res.status(404).json({ message: 'Log entry not found' });
    }

    res.status(200).json(entry);
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

//delete
exports.deleteUserCycleEntry = async (req, res) => {
  try {
    await CycleEntry.deleteOne({ 
      _id: req.params.id,
      user: req.user.userId 
    });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};