const moment = require('moment');
const _ = require('lodash');
const Q = require('q');

const Histories = require('../model/exercise_history');
const Notes = require('../model/exercise_note');

const getAllActivities = (req, res) => {
    const getHistories = () => {
        return Histories.find({}, (err, histories) => {
            if (err) return res.status(400).send(err);
        });
    }

    const getNotes = () => {
        return Notes.find({}, (err, notes) => {
            if (err) return res.status(400).send(err);
        });
    }

    Q.all([getHistories(), getNotes()])
    .spread(function (x, y) {
        const dateFormat = item => moment(item.updatedAt).format('YYYY-MM-DD');
        const mergeData = x.concat(y);
        const groupDate = _.groupBy(mergeData, dateFormat);

        res.status(200).json(groupDate);
    });
};

const getActivitiesByDate = (req, res) => {
    const dateSelected = new Date(req.query.date);

    const startDate = moment(dateSelected).startOf('day');
    const endDate = moment(dateSelected).endOf('day');

    const getHistories = () => {
        return Histories.find({
            'created_at': {
                $gt: startDate,
                $lt: endDate
            }
        }, (err, histories) => {
            if(err) return res.status(400).send(err);
        });
    }

    const getNotes = () => {
        return Notes.find({
            'created_at': {
                $gt: startDate,
                $lt: endDate
            }
        }, (err, notes) => {
            if(err) return res.status(400).send(err);
        });
    }

    Q.all([getHistories(), getNotes()])
    .spread(function (x, y) {
        const mergeData = {};

        if (x.length > 0) {
            mergeData.Histories = x;
        }

        if (y.length > 0) {
            mergeData.Notes = y;
        }

        res.status(200).json(mergeData);
    });
};

module.exports = {
    getAllActivities,
    getActivitiesByDate
};
