const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
	age: Date,
	email: {
		type: String,
		required: true,
		unique: true
	},
	full_name: String,
	gender: String,
	height: Number,
	password: {
		type: String,
		required: true
	},
	plan_id: Number,
	weight: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;