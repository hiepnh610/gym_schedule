const moment = require('moment');
const _ = require('lodash');

const Activity = require('../model/activities');

const createActivity = (req, res) => {
    if (req.body.exercises) {
        let activity = new Activity({
            created_by: req.body.created_by,
            exercises: req.body.exercises,
            workout_name: req.body.workout_name
        });

        activity.save((err, activity) => {
            if (err) return res.status(400).send(err);

            res.status(201).json({ message: 'Workout Logged.' });
        });
    }
};

const getAllActivities = (req, res) => {
    if (req.user) {
        const query = { 'created_by': req.user.username };

        Activity.find(query, (err, activities) => {
            if (err) return res.status(400).send(err);

            const dateFormat = item => moment(item.created_at).format('YYYY-MM-DD');
            const groupDate = _.groupBy(activities, dateFormat);

            const getIndex = Object.keys(groupDate).map((index) => {
                return index;
            });

            res.status(200).json(getIndex);
        });
    }
};

const deleteActivity = (req, res) => {
    if (req.params.activity_id) {
        const query = { '_id': req.params.activity_id };

        Activity.deleteOne(query, (err, activity) => {
            if(err) return res.status(400).send(err);

            res.json({ message: 'Activity deleted.' });
        });
    }
};

const getActivitiesByDate = (req, res) => {
    const dateSelected = new Date(req.query.date);

    const startDate = moment(dateSelected).startOf('day');
    const endDate = moment(dateSelected).endOf('day');

    const query = {
        'created_by': req.user.username,
        'created_at': {
            $gt: startDate,
            $lt: endDate
        }
    };

    Activity
    .find(query)
    .exec((err, activities) => {
        if (err) return res.status(400).send(err);

        res.status(200).json(activities);
    });
};

module.exports = {
    createActivity,
    getAllActivities,
    deleteActivity,
    getActivitiesByDate
};
