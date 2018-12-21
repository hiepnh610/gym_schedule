const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiySchema = new Schema({
    caption: String,
    comments: Array,
    likes: Array,
    track_log: Array,
    user: {
        type: Object,
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' } });

const Activitiy = mongoose.model('Activitiy', ActivitiySchema);

module.exports = Activitiy;
