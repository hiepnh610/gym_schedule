const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RoomSchema = new Schema({
    users: {
        type: Array,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
