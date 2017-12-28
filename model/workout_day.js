const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WorkoutDaySchema = new Schema({
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