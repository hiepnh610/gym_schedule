const moment = require('moment');
const _ = require('lodash');
const Q = require('q');

const Histories = require('../model/exercise_history');
const Notes = require('../model/exercise_note');

const getActivity = (req, res) => {
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

        mergeData = x.concat(y);

        const groupDate = _.groupBy(mergeData, dateFormat);

        res.status(200).json(groupDate);
    });
};

module.exports = {
    getActivity
};
