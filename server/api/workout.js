const Workout = require('../model/workout');

let workout = {};

const listWorkout = (req, res) => {
    if (req.query.id) {
        Workout.find({ '_id': req.query.id })
        .populate('_id')
        .exec((err, list) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(list);
        });
    }
};

const getWorkout = (req, res) => {
    if (req.query.id) {
        Workout.find({ 'plan_id': req.query.id })
        .populate('plan_id')
        .exec((err, plans) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(plans);
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
        Workout.deleteOne({
            _id: req.params.workout_id
        }, (err, workout_day) => {
            if(err) return res.status(400).send(err);

            res.json({ message: 'Workout Day Deleted.' });
        });
    }
};

module.exports = { listWorkout, getWorkout, createWorkout, updateWorkout, deleteWorkout };
