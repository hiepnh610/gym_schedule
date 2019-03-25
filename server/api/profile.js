const moment = require('moment');
const _ = require('lodash');

const User = require('../model/user');
const Activity = require('../model/activities');

const getInfo = (req, res) => {
    if (req.query.username) {
        const query = { 'username': req.query.username };

        User
        .findOne(query)
        .exec((err, user) => {
            if (err) return res.status(400).send(err);

            if (user) {
                const newUser = {
                    full_name: user.full_name
                };

                if (user.dob) {
                    newUser.dob = user.dob
                }

                if (user.avatar) {
                    newUser.avatar = user.avatar.location
                }

                if (user.bio) {
                    newUser.bio = user.bio
                }

                if (user.address) {
                    newUser.address = user.address
                }

                res.status(200).json(newUser);
            } else {
                res.status(400).json({ message: 'No user found.' });
            }
        });
    }
};

const getActivities = (req, res) => {
    if (req.query.username) {
        const query = { 'created_by': req.query.username };

        Activity.find(query)
        .exec((err, activities) => {
            if(err) return res.status(400).send(err);

            const dateFormat = item => moment(item.created_at).format('YYYY-MM-DD');
            const groupDate = _.groupBy(activities, dateFormat);

            let sortDataByDate = {};

            Object.keys(groupDate)
            .sort((a, b) => moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate())
            .forEach((key) => {
                sortDataByDate[key] = groupDate[key].map((item) => {
                    const newData = {};

                    newData._id = item._id;
                    newData.created_at = item.created_at;
                    newData.created_by = item.created_by;
                    newData.exercises = item.exercises;
                    newData.updatedAt = item.updatedAt;
                    newData.workout_name = item.workout_name;

                    if (item.likes.length) {
                        for (like of item.likes) {
                            if (like === req.user._id) {
                                newData.like = {
                                    status: true
                                }
                            } else {
                                newData.like = {
                                    status: false
                                }
                            }
                        }
                    } else {
                        newData.like = {
                            status: false
                        }
                    }

                    return newData;
                });
            });

            res.status(200).json(sortDataByDate);
        });
    }
};

module.exports = {
    getInfo,
    getActivities
};
