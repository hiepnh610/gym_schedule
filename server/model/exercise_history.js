const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Exercise = require('./exercise');

const SetsType = new Schema({
  reps: Number,
  weight: Number
});

const HistorySchema = new Schema({
  sets: [SetsType],
  exercise_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  }
}, { timestamps: { createdAt: 'created_at' }});

const Histories = mongoose.model('Histories', HistorySchema);

module.exports = Histories;
