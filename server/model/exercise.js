const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Workout = require('./workout');

const ExerciseSchema = new Schema({
    history: {
        required: false,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    sets: {
        required: false,
        type: Array
    },
    track_log: {
        required: false,
        type: String
    },
    workout_id: {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
        required: true,
    },
    status: {
        required: false,
        type: String
    }
}, { timestamps: { createdAt: 'created_at' }});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
