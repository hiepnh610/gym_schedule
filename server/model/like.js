const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    created_by: {
        type: String,
        required: true
    },

    activity_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
