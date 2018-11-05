const Notes = require('../model/exercise_note');

const createExerciseNote = (req, res) => {
  if (req.body.text) {
    const note = new Notes({
      text: req.body.text,
      exercise_id: req.body.exercise_id
    });

    note.save((err, note) => {
      if(err) return res.status(400).send(err);

      res.status(201).json(note);
    });
  }
};

const getExerciseNote = (req, res) => {
  if (req.query.id) {
      const query = req.query.id;

      Notes.find({ 'exercise_id': query })
      .populate('exercise_id')
      .exec(function (err, exer) {
          if(err) return res.status(400).send(err);

          res.status(200).json(exer);
      });
  }
};

const deleteExerciseNote = (req, res) => {
  if (req.params.note_id) {
      const query = req.params.note_id;

      Notes.deleteOne({
          _id: query
      }, (err, note) => {
          if(err) return res.status(400).send(err);

          res.json({ message: 'Note Deleted.' });
      });
  }
};

module.exports = {
  createExerciseNote,
  getExerciseNote,
  deleteExerciseNote
};
