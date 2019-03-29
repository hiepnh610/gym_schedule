const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    created_by: {
        type: String,
        required: true
    },

    activity_id: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    edited: {
        type: Boolean
    }
}, { timestamps: { createdAt: 'created_at' } });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
