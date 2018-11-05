const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Workout = require('./workout');

const ExerciseSchema = new Schema({
    image: {
        required: true,
        type: String
    },
    name: {
        required: true,
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
