const Plan = require('../model/plan');
const escapeHtml = require('escape-html');

let plan = {};

const listPlans = (req, res) => {
    if (req.user) {
        const query = { 'created_by': req.user.id };

        Plan.find(query)
        .populate('_id')
        .exec((err, list) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(list);
        });
    }
};

const getPlan = (req, res) => {
    if (req.user) {
        const query = { 'created_by': req.user.id };

        Plan.find(query)
        .populate({
            path: 'created_by',
            select: '_id'
        })
        .exec(function (err, plans) {
            if(err) return res.status(400).send(err);

            res.status(200).json(plans);
        });
    }
};

const createPlan = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The routine name cannot be blank.' });

    if (!req.body.type) return res.status(400).json({ 'message': 'The type cannot be blank.' });

    if (!req.body.frequency) return res.status(400).json({ 'message': 'The frequency cannot be blank.' });

    plan = new Plan({
        created_by: req.user.id,
        frequency: escapeHtml(req.body.frequency),
        name: escapeHtml(req.body.name),
        type: escapeHtml(req.body.type),
    });

    plan.save((err, plan) => {
        if (err) return res.status(400).send(err);

        res.status(201).json(plan);
    });
};

const updatePlan = (req, res) => {
    if (!req.body.name) return res.status(400).json({ 'message': 'The routine name cannot be blank.' });

    if (!req.body.type) return res.status(400).json({ 'message': 'The type cannot be blank.' });

    if (!req.body.frequency) return res.status(400).json({ 'message': 'The frequency cannot be blank.' });

    const query = req.params.plan_id;

    Plan.findById(query, (err, plan) => {
        if(err) return res.status(400).send(err);

        plan.set({
            frequency: escapeHtml(req.body.frequency),
            name: escapeHtml(req.body.name),
            type: escapeHtml(req.body.type)
        });

        plan.save((err, plan) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(plan);
        });
    });
};

const deletePlan = (req, res) => {
    if (req.params.plan_id) {
        const query = { '_id': req.params.plan_id };

        Plan.deleteOne(query, (err, plan) => {
            if(err) return res.status(400).send(err);

            res.status(200).json({ message: 'Plan deleted.' });
        });
    }
};

module.exports = {
    listPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan
};
