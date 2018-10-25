const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Workout = require('./workout');

const ExerciseSchema = new Schema({
    history: {
        required: false,
        type: Array
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
        type: Array
    },
    sets: {
        required: false,
        type: Array
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
