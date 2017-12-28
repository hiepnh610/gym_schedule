const express = require('express');
const router  = express.Router();

const Plan = require('../model/plan');

let plan = {};

const getPlan = (req, res) => {
	Plan.find((err, plans) => {
		if(err) return res.send(err);

		res.json(plans);
	});
};

const createPlan = (req, res) => {
	plan = new Plan({
		created_at: req.body.created_at,
		created_by: req.body.created_by,
		frequency: req.body.frequency,
		name: req.body.name,
		type: req.body.type,
		workout_day: req.body.workout_day
	});

	plan.save((err) => {
		if(err) return res.send(err);

		res.status(201).json({ message: 'Plan created.' });
	});
};

const updatePlan = (req, res) => {
	Plan.findById(req.params.plan_id, (err, plan) => {
		if(err) return res.send(err);

		plan.set({
			created_at: req.body.created_at,
			created_by: req.body.created_by,
			frequency: req.body.frequency,
			name: req.body.name,
			type: req.body.type,
			workout_day: req.body.workout_day
		});

		plan.save((err) => {
			if(err) return res.send(err);

			res.json({ message: 'Plan updated.' });
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