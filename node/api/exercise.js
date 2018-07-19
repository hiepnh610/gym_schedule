const Exercise = require('../model/exercise');

let exercise = {};

const getExercises = (req, res) => {
    Exercise.find({ '_id': req.query.id })
    .populate('_id')
    .exec(function (err, list) {
        if(err) return res.status(400).send(err);

        res.status(200).json(list);
    });
};

const createExercise = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The exercise name cannot be blank.' });

    if (!req.body.image) return res.status(400).json({ 'message': 'The exercise image cannot be blank.' });

    exercise = new Exercise({
        image: req.body.image,
        name: req.body.name,
        workout_id: req.body.workout_id
    });

    exercise.save((err) => {
        if(err) return res.send(err);

        res.status(201).json({ message: 'Exercise created.' });
    });
};

const updateExercise = (req, res) => {
    Exercise.findById(req.params.exercise_id, (err, exercise) => {
        if(err) return res.send(err);

        exercise.set({
            history: req.body.history,
            sets: req.body.sets,
            track_note: req.body.track_note
        });

        exercise.save((err, exercise) => {
            if(err) return res.send(err);

            res.json(exercise);
        });
    });
};

const deleteExercise = (req, res) => {
    Exercise.remove({
        _id: req.params.exercise_id
    }, (err, exercise) => {
        if(err) return res.send(err);

        res.json({ message: 'Exercise Deleted.' });
    });
};

module.exports = { getExercises, createExercise, updateExercise, deleteExercise };
