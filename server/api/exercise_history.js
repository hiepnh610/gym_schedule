const Histories = require('../model/exercise_history');

const createExerciseHistory = (req, res) => {
  if (req.body.history) {
    const history = new Histories({
      sets: req.body.history.sets,
      exercise_id: req.body.exercise_id
    });

    history.save((err, history) => {
      if(err) return res.status(400).send(err);

      res.status(201).json(history);
    });
  }
};

const getExerciseHistory = (req, res) => {
  if (req.query.id) {
      const query = req.query.id;

      Histories.find({ 'exercise_id': query })
      .populate('exercise_id')
      .exec(function (err, exer) {
          if(err) return res.status(400).send(err);

          res.status(200).json(exer);
      });
  }
};

module.exports = {
  createExerciseHistory,
  getExerciseHistory
};
