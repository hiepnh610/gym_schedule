const express = require('express');
const router  = express.Router();

const WorkoutDay = require('../model/workout_day');

let workoutDay = {};

const listWorkout = (req, res) => {
    WorkoutDay.find({ '_id': req.query.id })
    .populate('_id')
    .exec(function (err, list) {
       if(err) return res.status(400).send(err);

       res.status(200).json(list);
    });
};

const getWorkoutDay = (req, res) => {
    WorkoutDay.find({ 'plan_id': req.query.id })
    .populate('plan_id')
    .exec(function (err, plans) {
       if(err) return res.status(400).send(err);

       res.status(200).json(plans);
    });
};

const createWorkoutDay = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The workout name cannot be blank.' });

    if (!req.body.week_day) return res.status(400).json({ 'message': 'The workout day cannot be blank.' });

    workoutDay = new WorkoutDay({
        name: req.body.name,
        week_day: req.body.week_day,
        plan_id: req.body.plan_id
    });

    workoutDay.save((err, workout) => {
        if(err) return res.status(400).send(err);

        res.status(201).json(workout);
    });
};

const updateWorkoutDay = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The workout name cannot be blank.' });

    if (!req.body.week_day) return res.status(400).json({ 'message': 'The workout day cannot be blank.' });

    WorkoutDay.findById(req.params.workout_day_id, (err, workout_day) => {
        if(err) return res.send(err);

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

const deleteWorkoutDay = (req, res) => {
    WorkoutDay.remove({
        _id: req.params.workout_day_id
    }, (err, workout_day) => {
        if(err) return res.send(err);

        res.json({ message: 'Workout Day Deleted.' });
    });
};

module.exports = { listWorkout, getWorkoutDay, createWorkoutDay, updateWorkoutDay, deleteWorkoutDay };
