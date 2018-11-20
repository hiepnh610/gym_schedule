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
    .spread(function (histories, notes) {
        const dateFormat = item => moment(item.updatedAt).format('YYYY-MM-DD');
        const concatData = histories.concat(notes);
        const groupDate = _.groupBy(concatData, dateFormat);

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
        })
        .populate('exercise_id')
        .exec();
    }

    const getNotes = () => {
        return Notes.find({
            'created_at': {
                $gt: startDate,
                $lt: endDate
            }
        })
        .populate('exercise_id')
        .exec();
    }

    Q.all([getHistories(), getNotes()])
    .spread((histories, notes) => {
        let result = [];

        if (notes.length) {
            result = notes.map((note) => {
                let newData = {};
                const newReps = histories
                .filter(history => history.exercise_id._id.toString() == note.exercise_id._id.toString())
                .map(history => {
                    return {
                        _id: history._id,
                        sets: history.sets
                    }
                });

                newData['_id'] = note['exercise_id']['_id'];
                newData['histories'] = _.flatten(newReps);
                newData['note'] = {
                    _id: note['_id'],
                    text: note['text']
                };
                newData['name'] = note['exercise_id']['name'];
                newData['image'] = note['exercise_id']['image'];

                return newData;
            });
        } else {
            result = histories.map((history) => {
                let newData = {};

                newData['_id'] = history['exercise_id']['_id'];
                newData['name'] = history['exercise_id']['name'];
                newData['image'] = history['exercise_id']['image'];
                newData['histories'] = [{
                    _id: history._id,
                    sets: history.sets
                }];

                return newData;
            });
        }

        res.status(200).json(result);
    });
};

const deleteActivitiesByDay = (req, res) => {
    const dateSelected = new Date(req.query.date);

    const startDate = moment(dateSelected).startOf('day');
    const endDate = moment(dateSelected).endOf('day');

    const deleteHistories = () => {
        Histories.deleteOne({
            'created_at': {
                $gt: startDate,
                $lt: endDate
            },
            'exercise_id': req.params.exercise_id
        })
        .exec();
    };

    const deleteNotes = () => {
        Notes.deleteOne({
            'created_at': {
                $gt: startDate,
                $lt: endDate
            },
            'exercise_id': req.params.exercise_id
        })
        .exec();
    };

    Q.all([deleteHistories(), deleteNotes()])
    .spread(() => {
        res.status(200).json({ message: 'Activity Deleted.' });
    });
};

module.exports = {
    getAllActivities,
    getActivitiesByDate,
    deleteActivitiesByDay
};
