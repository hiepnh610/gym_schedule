const Histories = require('../model/exercise_histories');

const createExerciseHistory = (req, res) => {
    if (req.body.track_log && req.body.exercise_id) {
        let history = new Histories({
            track_log: req.body.track_log,
            exercise_id: req.body.exercise_id
        });

        if (req.body.note) {
            history.note = req.body.note;
        }

        history.save((err, history) => {
            if (err) return res.status(400).send(err);

            res.status(201).json(history);
        });
    }
};

const getExerciseHistory = (req, res) => {
    if (req.query.id) {
        const query = req.query.id;

        Histories.find({ 'exercise_id': query })
        .populate('exercise_id')
        .exec((err, history) => {
            if (err) return res.status(400).send(err);

            res.status(200).json(history);
        });
    }
};

const deleteExerciseTrackLog = (req, res) => {
    if (req.params.history_id) {
        const query = req.params.history_id;

        Histories.findOne({
            _id: query
        }, (err, history) => {
            if (err) return res.status(400).send(err);

            if (history['track_log'] && history['note']) {
                history['track_log'] = undefined;

                history.save();
            } else {
                Histories.deleteOne({
                    _id: query
                }, (err, history) => {
                    if (err) return res.status(400).send(err);
                });
            }

            res.json({ message: 'Track Log Deleted.' });
        });
    }
};

const deleteExerciseNote = (req, res) => {
    if (req.params.history_id && req.body.status === 'Delete') {
        const query = req.params.history_id;

        Histories.findOne({
            _id: query
        }, (err, history) => {
            if (err) return res.status(400).send(err);

            if (history['track_log'].length && history['note']) {
                history['note'] = undefined;

                history.save();
            } else {
                Histories.deleteOne({
                    _id: query
                }, (err, history) => {
                    if (err) return res.status(400).send(err);
                });
            }

            res.status(200).json({ message: 'Note Deleted.' });
        });
    }

    if (req.params.history_id && req.body.status === 'Update' && req.body.note) {
        const query = req.params.history_id;
        const newNote = req.body.note;

        Histories.findOne({
            _id: query
        }, (err, history) => {
            if (err) return res.status(400).send(err);

            if (history['note']) {
                history['note'] = newNote;
                history.save();
            }

            res.status(200).json(history);
        });
    }
};

module.exports = {
    createExerciseHistory,
    getExerciseHistory,
    deleteExerciseTrackLog,
    deleteExerciseNote
};
