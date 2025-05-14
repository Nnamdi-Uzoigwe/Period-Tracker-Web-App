// controllers/cycleController.js
const CycleEntry = require('../models/CycleEntry');
const Prediction = require('../models/Prediction');

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


// Create new cycle entry and prediction
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

    const predictionData = calculatePrediction(startDate, cycleLength);

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
    const cycleEntries = await CycleEntry.find({ user: req.user.userId });
    res.status(200).json(cycleEntries);
  } catch (err) {
    console.error('Error fetching cycle entries:', err);
    res.status(500).json({ message: 'Server error' });
  }
};