const Exercise = require('../model/exercise');

let exercise = {};

const listExercise = (req, res) => {
    if (req.query.id) {
        Exercise.find({ '_id': req.query.id })
        .populate('_id')
        .exec(function (err, list) {
            if(err) return res.status(400).send(err);

            res.status(200).json(list);
        });
    }
};

const getExercise = (req, res) => {
    if (req.query.id) {
        Exercise.find({ 'workout_id': req.query.id })
        .populate('workout_id')
        .exec(function (err, exer) {
            if(err) return res.status(400).send(err);

            res.status(200).json(exer);
        });
    }
};

const createExercise = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The exercise name cannot be blank.' });

    if (!req.body.image) return res.status(400).json({ 'message': 'The exercise image cannot be blank.' });

    exercise = new Exercise({
        image: req.body.image,
        name: req.body.name,
        workout_id: req.body.workout_id
    });

    exercise.save((err, exercise) => {
        if(err) return res.status(400).send(err);

        res.status(201).json(exercise);
    });
};

const updateExercise = (req, res) => {
    if (req.params.exercise_id) {
        Exercise.findById(req.params.exercise_id, (err, exercise) => {
            if(err) return res.send(err);

            const data = {};

            if (req.body.history) {
                data.history = req.body.history;
            }

            if (req.body.note) {
                data.note = req.body.note;
            }

            exercise.set(data);

            exercise.save((err, exercise) => {
                if(err) return res.status(400).send(err);

                res.json(exercise);
            });
        });
    }
};

const deleteExercise = (req, res) => {
    if (req.params.exercise_id) {
        Exercise.deleteOne({
            _id: req.params.exercise_id
        }, (err, exercise) => {
            if(err) return res.status(400).send(err);

            res.json({ message: 'Exercise Deleted.' });
        });
    }
};

module.exports = {
    listExercise,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
};
