const express = require('express');
const router  = express.Router();

const Exercise = require('../model/exercise');

let exercise = {};

const getExercise = (req, res) => {
    Exercise.find((err, exercises) => {
        if(err) return res.send(err);

        res.json(exercises);
    });
};

const createExercise = (req, res) => {
    exercise = new Exercise({
        image_url: req.body.image_url,
        name: req.body.name
    });

    exercise.save((err) => {
        if(err) return res.send(err);

        res.status(201).json({ message: 'Exercise created.' });
    });
};

module.exports = { getExercise, createExercise };
