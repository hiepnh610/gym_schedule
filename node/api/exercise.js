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

module.exports = { getExercises, createExercise };
