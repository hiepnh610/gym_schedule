const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ImageSchema = new Schema({
    created_by: {
        type: String,
        required: true,
    },

    exercise_id: {
        type: String
    },

    type: {
        type: String
    },

    url: {
        type: String,
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' }});

const Images = mongoose.model('Images', ImageSchema);

module.exports = Images;
