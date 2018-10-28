const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Workout = require('./workout');

const SetsType = new Schema({
    reps: Number,
    weight: Number
});

const HistoryType = new Schema({
    sets: [SetsType]
}, { timestamps: { createdAt: 'created_at' }});

const NoteType = new Schema({
    text: String
}, { timestamps: { createdAt: 'created_at' }});

const ExerciseSchema = new Schema({
    history: {
        required: false,
        type: [HistoryType]
    },
    image: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    note: {
        required: false,
        type: [NoteType]
    },
    status: {
        required: false,
        type: String
    },
    workout_id: {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' }});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
