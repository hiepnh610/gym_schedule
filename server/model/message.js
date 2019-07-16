const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MessageSchema = new Schema({
    created_by: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
