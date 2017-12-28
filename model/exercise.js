const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ExerciseSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	image_url: {
		required: true,
		type: String
	}
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;