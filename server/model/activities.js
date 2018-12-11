const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiySchema = new Schema({
    avatar: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    exercises_name: {
        required: true,
        type: Array
    },
    workout_name: {
        required: true,
        type: String
    },
    likes: Array,
    comments: Array
}, { timestamps: { createdAt: 'created_at' } });

const Activitiy = mongoose.model('Activitiy', ActivitiySchema);

module.exports = Activitiy;
