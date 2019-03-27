const moment = require('moment');
const _ = require('lodash');

const User = require('../model/user');
const Activity = require('../model/activities');
const Like = require('../model/like');

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

const getActivities = (req) => {
    if (req.query.username) {
        const query = { 'created_by': req.query.username };

        return Activity.find(query).exec();
    }
};

const getLikes = (arr) => {
    if (arr.length) {
        return Like.find({ 'activity_id': { $in: arr } }).exec();
    }
};

const profileActivities = async (req, res) => {
    try {
        const activities = await (getActivities(req));
        const activityId = activities.map((item) => item._id);
        const likeActivity = await (getLikes(activityId));

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
                newData.like = {
                    status: false
                }

                for (like of likeActivity) {
                    if (like.activity_id === (item._id).toString()) {
                        newData.like = {
                            status: true
                        }
                    }
                }

                return newData;
            });
        });

        return res.status(200).send(sortDataByDate);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports = {
    getInfo,
    profileActivities
};
