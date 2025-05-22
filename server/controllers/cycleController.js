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

// exports.createCycleEntry = async (req, res) => {
//   try {
//     const { startDate, cycleLength, periodLength, symptoms, notes } = req.body;

//     const newCycle = new CycleEntry({
//       userId: req.user.userId,
//       startDate,
//       cycleLength,
//       periodLength,
//       symptoms,
//       notes,
//     });

//     await newCycle.save();

//     const pastCycles = await CycleEntry.find({ userId: req.user.userId }).sort({ startDate: -1 }).limit(5);

//     const cycleLengths = pastCycles.map(cycle => cycle.cycleLength);

//     const predictionData = calculatePrediction(new Date(startDate), cycleLengths);

//     const prediction = new Prediction({
//       cycleEntryId: newCycle._id,
//       ...predictionData,
//     });

//     await prediction.save();

//     res.status(201).json({
//       message: 'Cycle entry and prediction created successfully',
//       cycle: newCycle,
//       prediction,
//     });
//   } catch (err) {
//     console.error('Cycle Entry Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.createCycleEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { startDate, cycleLength, periodLength, symptoms, notes } = req.body;

    // 1. Validate input dates
    if (new Date(startDate) > new Date()) {
      throw new Error("Start date cannot be in the future");
    }

    // 2. Create new cycle entry
    const newCycle = new CycleEntry({
      userId: req.user.userId,
      startDate,
      cycleLength,
      periodLength,
      symptoms: symptoms || [],
      notes: notes || "",
    });

    // 3. Get past cycles for prediction calculation
    const pastCycles = await CycleEntry.find({ 
      userId: req.user.userId,
      startDate: { $lt: new Date(startDate) } // Only older cycles
    })
    .sort({ startDate: -1 })
    .limit(5)
    .session(session);

    // // 4. Calculate prediction data
    // const predictionData = calculatePrediction(new Date(startDate), pastCycles.map(cycle => cycle.cycleLength));
    const cycleLengths = pastCycles.length ? pastCycles.map(cycle => cycle.cycleLength): [cycleLength]; 

const predictionData = calculatePrediction(new Date(startDate), cycleLengths);

    // 5. Create and save prediction in same transaction
    const prediction = new Prediction({
      cycleEntryId: newCycle._id, // Explicitly using the new cycle's ID
      ...predictionData,
    });

    // 6. Save both documents transactionally
    await newCycle.save({ session });
    await prediction.save({ session });
    
    await session.commitTransaction();

    // 7. Verify the relationship after creation
    const savedPrediction = await Prediction.findById(prediction._id);
    if (!savedPrediction || !savedPrediction.cycleEntryId.equals(newCycle._id)) {
      throw new Error("Prediction-Cycle link verification failed");
    }

    res.status(201).json({
      message: 'Cycle entry and prediction created successfully',
      cycle: newCycle,
      prediction: savedPrediction,
    });

  } catch (err) {
    await session.abortTransaction();
    console.error('Cycle Entry Error:', err);
    
    // Specific error messages
    const statusCode = err.message.includes("validation") ? 400 : 500;
    res.status(statusCode).json({ 
      message: err.message || 'Server error',
      errorType: err.name 
    });
  } finally {
    session.endSession();
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
      userId: req.user.userId 
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
    const result = await CycleEntry.deleteOne({ 
      _id: req.params.id,
      userId: req.user.userId 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cycle entry not found or not authorized' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
