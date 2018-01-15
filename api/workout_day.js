const express = require('express');
const router  = express.Router();

const WorkoutDay = require('../model/workout_day');

let workoutDay = {};

const getWorkoutDay = (req, res) => {
    WorkoutDay.find((err, workout_day) => {
        if(err) return res.send(err);

        res.json(workout_day);
    });
};

const createWorkoutDay = (req, res) => {
    workoutDay = new WorkoutDay({
        name: req.body.name,
        week_day: req.body.week_day
    });

    workoutDay.save((err) => {
        if(err) return res.send(err);

        res.status(201).json({ message: 'Workout Day created.' });
    });
};

const updateWorkoutDay = (req, res) => {
    WorkoutDay.findById(req.params.workout_day_id, (err, workout_day) => {
        if(err) return res.send(err);

        workout_day.set({
            name: req.body.name,
            week_day: req.body.week_day,
        });

        workout_day.save((err) => {
            if(err) return res.send(err);

            res.json({ message: 'Workout Day updated.' });
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

module.exports = { getWorkoutDay, createWorkoutDay, updateWorkoutDay, deleteWorkoutDay };
