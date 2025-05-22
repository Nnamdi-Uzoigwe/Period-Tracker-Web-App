// const mongoose = require('mongoose');

// const predictionSchema = new mongoose.Schema({
//   cycleEntryId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CycleEntry',
//     required: true,
//   },
//   nextPeriod: {
//     type: Date,
//     required: true,
//   },
//   ovulationDate: {
//     type: Date,
//     required: true,
//   },
//   fertileStart: {
//     type: Date,
//     required: true,
//   },
//   fertileEnd: {
//     type: Date,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Prediction', predictionSchema);
const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  cycleEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CycleEntry',
    required: true,
    validate: { // Custom validator to ensure reference exists
      validator: async function(v) {
        const doc = await mongoose.model('CycleEntry').exists({ _id: v });
        return doc;
      },
      message: props => `CycleEntry ${props.value} does not exist`
    }
  },
  nextPeriod: {
    type: Date,
    required: true,
    validate: { // Prevent dates before 2000
      validator: function(v) {
        return v > new Date('2000-01-01');
      },
      message: props => `${props.value} is not a valid future date`
    }
  },
  ovulationDate: { type: Date, required: true },
  fertileStart: { type: Date, required: true },
  fertileEnd: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 1. Unique index to prevent duplicate predictions per cycle
predictionSchema.index({ cycleEntryId: 1 }, { unique: true });

// 2. Compound index for frequently queried date ranges
predictionSchema.index({ 
  nextPeriod: 1,
  ovulationDate: 1,
  fertileStart: 1,
  fertileEnd: 1 
});

// 3. Automatic reference validation on save
predictionSchema.pre('save', async function(next) {
  if (this.isModified('cycleEntryId')) {
    const cycleExists = await mongoose.model('CycleEntry').exists({ _id: this.cycleEntryId });
    if (!cycleExists) throw new Error(`Referenced CycleEntry ${this.cycleEntryId} not found`);
  }
  next();
});

// 4. Cascade delete hook (optional)
predictionSchema.post('findOneAndDelete', async function(doc) {
  await mongoose.model('CycleEntry').updateOne(
    { _id: doc.cycleEntryId },
    { $unset: { prediction: 1 } }
  );
});

module.exports = mongoose.model('Prediction', predictionSchema);