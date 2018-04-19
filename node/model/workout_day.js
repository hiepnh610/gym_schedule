const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Plan = require('./plan');

const WorkoutDaySchema = new Schema({
    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    },
    name: {
        required: true,
        type: String
    },
    week_day: {
        type: String,
        unique: true
    }
}, { timestamps: { createdAt: 'created_at' }});

const WorkoutDay = mongoose.model('WorkoutDay', WorkoutDaySchema);

module.exports = WorkoutDay;
