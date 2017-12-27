const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlanSchema = new Schema({
	created_at: {
		required: true,
		type: Date
	},
	created_by: {
		required: true,
		type: Number
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