const Q = require('q');

const Workout = require('../model/workout');
const Exercise = require('../model/exercise');

let workout = {};

const listWorkout = (req, res) => {
    if (req.query.id) {
        const query = { '_id': req.query.id };

        Workout.find(query)
        .populate('_id')
        .exec((err, list) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(list);
        });
    }
};

const createWorkout = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The workout name cannot be blank.' });

    if (!req.body.week_day) return res.status(400).json({ 'message': 'The workout day cannot be blank.' });

    workout = new Workout({
        name: req.body.name,
        week_day: req.body.week_day,
        plan_id: req.body.plan_id
    });

    workout.save((err, workout) => {
        if(err) return res.status(400).send(err);

        res.status(201).json(workout);
    });
};

const updateWorkout = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The workout name cannot be blank.' });

    if (!req.body.week_day) return res.status(400).json({ 'message': 'The workout day cannot be blank.' });

    Workout.findById(req.params.workout_day_id, (err, workout_day) => {
        if(err) return res.status(400).send(err);

        workout_day.set({
            name: req.body.name,
            week_day: req.body.week_day,
        });

        workout_day.save((err, workout) => {
            if(err) return res.send(err);

            res.json(workout);
        });
    });
};

const deleteWorkout = (req, res) => {
    if (req.params.workout_id) {
        const query = { '_id': req.params.workout_id };

        Workout.deleteOne(query, (err, workout_day) => {
            if(err) return res.status(400).send(err);

            res.json({ message: 'Workout Day Deleted.' });
        });
    }
};

const getWorkout = (req) => {
    if (req.query.id) {
        const query = { 'plan_id': req.query.id };

        return Workout.find(query, (err, workout) => {
            if(err) return res.status(400).send(err);
        });
    }
};

const getExercises = (req) => {
    return Exercise.find({}, (err, workout) => {
        if(err) return res.status(400).send(err);
    });
};

const mergeExerciseIntoWorkout = (req, res) => {
    Q.all([getWorkout(req), getExercises(req)])
    .spread(function (workouts, exercises) {
        const newData = workouts.map((workout) => {
            const exerciseData = exercises.filter(exercise => exercise.workout_id.toString() == workout._id.toString());

            return {
                _id: workout._id,
                name: workout.name,
                week_day: workout.week_day,
                plan_id: workout.plan_id,
                created_at: workout.created_at,
                updatedAt: workout.updatedAt,
                exercises: exerciseData
            };
        });

        res.status(200).json(newData);
    });
};

module.exports = {
    listWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    mergeExerciseIntoWorkout
};
