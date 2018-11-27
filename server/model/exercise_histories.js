const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exercise = require('./exercise');

const TrackLogType = new Schema({
    reps: Number,
    weight: Number
});

const HistorySchema = new Schema({
    track_log: [TrackLogType],
    note: String,
    exercise_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' } });

const Histories = mongoose.model('Histories', HistorySchema);

module.exports = Histories;
