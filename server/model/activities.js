const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseLogType = new Schema({
    reps: {
        type: Number
    },
    weight: {
        type: Number
    }
});

const ExercisesType = new Schema({
    exercise_id: {
        type: String
    },
    exercise_name: {
        type: String
    },
    exercise_image: {
        type: String
    },
    exercise_note: {
        type: String
    },
    exercise_log: [ExerciseLogType]
});

const ActivitySchema = new Schema({
    created_by: {
        type: String,
        required: true
    },
    likes: {
        type: Array
    },
    exercises: [ExercisesType],
    workout_name: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at' } });

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
