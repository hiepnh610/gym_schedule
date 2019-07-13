const moment = require('moment');
const _ = require('lodash');

const User = require('../model/user');
const Activity = require('../model/activities');

const getUserInfo = (id) => {
    if (id) {
        try {
            const user = User.findOne({ _id: id });

            if (!user) return { error: 'No user found.' };

            return user;
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The ID field is empty.' };
    }
};

const getMyActivities = (username) => {
    if (username) {
        try {
            const activities = Activity.find({ created_by: username });

            return activities;
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The username field is empty.' };
    }
};

const getFollowingActivities = async (id) => {
    const user = await getUserInfo(id);

    if (user.error) {
        return { error: user.error };
    } else {
        try {
            return Activity.find({ created_by: { $in: user.following } });
        } catch (e) {
            return { error: e };
        }
    }
};

const getFollowingInfo = async (id) => {
    const user = await getUserInfo(id);

    if (user.error) {
        return { error: user.error };
    } else {
        try {
            return User.find({ username: { $in: user.following } });
        } catch (e) {
            return { error: e };
        }
    }
};

const newsFeed = async (req, res) => {
    const myActivities = await getMyActivities(req.user.username);
    const followingActivities = await getFollowingActivities(req.user.id);
    const followingInfo = await getFollowingInfo(req.user.id);
    const myInfo = await getUserInfo(req.user.id);
    const fullName = _.concat(followingInfo, myInfo).map(user => {
        return {
            avatar: user.avatar ? user.avatar : '',
            full_name: user.full_name,
            username: user.username
        }
    });

    if (myActivities.error) {
        return res.status(400).json({ 'message': myActivities.error });
    } else if (followingActivities.error) {
        return res.status(400).json({ 'message': followingActivities.error });
    } else if (myInfo.error) {
        return res.status(400).json({ 'message': myInfo.error });
    } else if (followingInfo.error) {
        return res.status(400).json({ 'message': followingInfo.error });
    } else {
        const concatActivities = _.concat(myActivities, followingActivities);

        const dateFormat = item => moment(item.created_at).format('YYYY-MM-DD');
        const groupDate = _.groupBy(concatActivities, dateFormat);

        let sortDataByDate = {};

        const sortData = Object.keys(groupDate)
            .sort((a, b) => moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate());

        sortData.forEach((key) => {
            sortDataByDate[key] = groupDate[key].map((item) => {
                const newData = {};

                newData._id = item._id;
                newData.created_at = item.created_at;
                newData.created_by = item.created_by;
                newData.exercises = item.exercises;
                newData.updatedAt = item.updatedAt;
                newData.workout_name = item.workout_name;
                newData.like = { status: false };
                newData.comments = [];

                if (fullName) {
                    for (let name of fullName) {
                        if (name.username === item.created_by) {
                            newData.avatar = name.avatar;
                            newData.full_name = name.full_name;
                        }
                    }
                }

                return newData;
            });
        });

        res.status(200).json(sortDataByDate);
    }
};

module.exports = {
    newsFeed
};
