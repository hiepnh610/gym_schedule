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

        if (histories.length && notes.length) {
            if (notes.length >= histories.length) {
                result = notes.map((note) => {
                    const newReps = _.flatten(histories
                    .filter(history => history['exercise_id']['_id'].toString() == note['exercise_id']['_id'].toString())
                    .map(history => {
                        return {
                            _id: history['_id'],
                            sets: history['sets']
                        }
                    }));

                    let newData = {};

                    newData['_id'] = note['exercise_id']['_id'];
                    newData['name'] = note['exercise_id']['name'];
                    newData['image'] = note['exercise_id']['image'];
                    newData['histories'] = newReps;
                    newData['note'] = {
                        _id: note['_id'],
                        text: note['text']
                    };

                    return newData;
                });
            }

            if (notes.length < histories.length) {
                result = histories.map((history) => {
                    const newNotes = notes
                        .filter(note => history['exercise_id']['_id'].toString() == note['exercise_id']['_id'].toString())
                        .map(note => {
                            return {
                                _id: note['_id'],
                                text: note['text']
                            }
                        });

                    // Convert note array to object.
                    const convertNote = _.reduce(newNotes , (obj, note) => {
                        obj['_id'] = note['_id'];
                        obj['text'] = note['text'];

                        return obj;
                    }, {});

                    let newData = {};

                    newData['_id'] = history['exercise_id']['_id'];
                    newData['name'] = history['exercise_id']['name'];
                    newData['image'] = history['exercise_id']['image'];
                    newData['histories'] = [{
                        _id: history['_id'],
                        sets: history['sets']
                    }];

                    if (!_.isEmpty(convertNote)) {
                        newData['note'] = convertNote;
                    }

                    return newData;
                });
            }
        } else if (histories.length) {
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
        } else {
            result = notes.map((note) => {
                let newData = {};

                newData['_id'] = note['exercise_id']['_id'];
                newData['name'] = note['exercise_id']['name'];
                newData['image'] = note['exercise_id']['image'];
                newData['note'] = {
                    _id: note._id,
                    text: note.text
                };

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
