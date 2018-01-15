const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlanSchema = new Schema({
    created_at: {
        type: Date
    },
    created_by: {
        type: String
    },
    frequency: String,
    name: {
        required: true,
        type: String
    },
    type: String,
    workout_day: Object
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
