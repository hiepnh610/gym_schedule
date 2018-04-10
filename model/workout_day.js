const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Plan = require('./plan');

const WorkoutDaySchema = new Schema({
    created_by: {
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
});

const WorkoutDay = mongoose.model('WorkoutDay', WorkoutDaySchema);

module.exports = WorkoutDay;
