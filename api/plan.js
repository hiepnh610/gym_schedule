const express = require('express');
const router  = express.Router();

const Plan = require('../model/plan');

let plan = {};

const getPlan = (req, res) => {
    Plan.find({ 'created_by': req.query.id })
    .populate('created_by')
    .exec(function (err, plans) {
       if(err) return res.status(400).send(err);
       res.json(plans);
    });
};

const createPlan = (req, res) => {
    plan = new Plan({
        created_by: req.body.created_by,
        frequency: req.body.frequency,
        name: req.body.name,
        type: req.body.type,
    });

    plan.save((err, plan) => {
        if(err) return res.status(400).send(err);

        res.status(201).json(plan);
    });
};

const updatePlan = (req, res) => {
    Plan.findById(req.params.plan_id, (err, plan) => {
        if(err) return res.send(err);

        plan.set({
            frequency: req.body.frequency,
            name: req.body.name,
            type: req.body.type
        });

        plan.save((err, plan) => {
            if(err) return res.send(err);

            res.status(200).json(plan);
        });
    });
};

const deletePlan = (req, res) => {
    Plan.remove({
        _id: req.params.plan_id
    }, (err, plan) => {
        if(err) return res.send(err);

        res.json({ message: 'Plan deleted.' });
    });
};

module.exports = { getPlan, createPlan, updatePlan, deletePlan }
