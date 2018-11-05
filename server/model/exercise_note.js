const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Exercise = require('./exercise');

const NoteSchema = new Schema({
  text: String,
  exercise_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  }
}, { timestamps: { createdAt: 'created_at' }});

const Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;
