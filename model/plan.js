const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = require('./user');

const PlanSchema = new Schema({
    created_at: {
        type: Date
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    frequency: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    workout_day: Object
}, { timestamps: { createdAt: 'created_at' }});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
