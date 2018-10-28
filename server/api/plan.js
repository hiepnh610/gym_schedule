const Plan = require('../model/plan');

let plan = {};

const listPlans = (req, res) => {
    Plan.find({ '_id': req.query.id })
    .populate('_id')
    .exec(function (err, list) {
        if(err) return res.status(400).send(err);

        res.status(200).json(list);
    });
};

const getPlan = (req, res) => {
    Plan.find({ 'created_by': req.query.id })
    .populate('created_by')
    .exec(function (err, plans) {
        if(err) return res.status(400).send(err);

        res.status(200).json(plans);
    });
};

const createPlan = (req, res) => {

    if (!req.body.name) return res.status(400).json({ 'message': 'The routine name cannot be blank.' });

    if (!req.body.type) return res.status(400).json({ 'message': 'The type cannot be blank.' });

    if (!req.body.frequency) return res.status(400).json({ 'message': 'The frequency cannot be blank.' });

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
    if (!req.body.name) return res.status(400).json({ 'message': 'The routine name cannot be blank.' });

    if (!req.body.type) return res.status(400).json({ 'message': 'The type cannot be blank.' });

    if (!req.body.frequency) return res.status(400).json({ 'message': 'The frequency cannot be blank.' });

    Plan.findById(req.params.plan_id, (err, plan) => {
        if(err) return res.status(400).send(err);

        plan.set({
            frequency: req.body.frequency,
            name: req.body.name,
            type: req.body.type
        });

        plan.save((err, plan) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(plan);
        });
    });
};

const deletePlan = (req, res) => {
    Plan.deleteOne({
        _id: req.params.plan_id
    }, (err, plan) => {
        if(err) return res.status(400).send(err);

        res.json({ message: 'Plan deleted.' });
    });
};

module.exports = { listPlans, getPlan, createPlan, updatePlan, deletePlan }
