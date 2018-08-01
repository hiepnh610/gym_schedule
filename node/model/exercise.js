const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WorkoutDay = require('./workout_day');

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
    track_note: {
        required: false,
        type: String
    },
    workout_id: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutDay',
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' }});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
