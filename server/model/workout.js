const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Plan = require('./plan');

const WorkoutDaySchema = new Schema({
    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    name: {
        required: true,
        type: String
    },
    week_day: {
        required: true,
        type: String
    }
}, { timestamps: { createdAt: 'created_at' }});

const WorkoutDay = mongoose.model('WorkoutDay', WorkoutDaySchema);

module.exports = WorkoutDay;
