const moment = require('moment');
const _ = require('lodash');

const Histories = require('../model/exercise_histories');

const getAllHistories = (req, res) => {
    Histories.find({}, (err, histories) => {
        if (err) return res.status(400).send(err);

        const dateFormat = item => moment(item.created_at).format('YYYY-MM-DD');
        const groupDate = _.groupBy(histories, dateFormat);

        res.status(200).json(groupDate);
    });
};

const getHistoriesByDate = (req, res) => {
    const dateSelected = new Date(req.query.date);

    const startDate = moment(dateSelected).startOf('day');
    const endDate = moment(dateSelected).endOf('day');

    Histories.find({
        'created_at': {
            $gt: startDate,
            $lt: endDate
        }
    })
    .populate('exercise_id')
    .exec((err, histories) => {
        if (err) return res.status(400).send(err);

        const newHistories = histories.map((history) => {
            let newData = {};

            newData['_id'] = history['_id'];
            newData['name'] = history['exercise_id']['name'];
            newData['image'] = history['exercise_id']['image'];

            if (history.track_log.length) {
                newData['track_log'] = history.track_log;
            }

            if (history.note) {
                newData['note'] = history.note;
            }

            return newData;
        });

        res.status(200).json(newHistories);
    });
};

const deleteHistoryByDate = (req, res) => {
    if (req.params.history_id) {
        const query = req.params.history_id;

        Histories.deleteOne({
            _id: query
        }, (err, history) => {
            if (err) return res.status(400).send(err);

            res.json({ message: 'Exercise Deleted.' });
        });
    }
};

const updateHistory = (req, res) => {
    if (req.params.history_id) {
        const query = req.params.history_id;

        Histories.findOne({
            _id: query
        }, (err, history) => {
            if (err) return res.status(400).send(err);

            if (req.body.track_log) {
                history['track_log'] = req.body.track_log;
            }

            if (req.body.note) {
                history['note'] = req.body.note;
            } else {
                history['note'] = undefined;
            }

            history.save();

            res.json(history);
        });
    }
};

module.exports = {
    getAllHistories,
    getHistoriesByDate,
    deleteHistoryByDate,
    updateHistory,
};
