const moment = require('moment');
const _ = require('lodash');

const User = require('../model/user');
const Like = require('../model/like');
const Comment = require('../model/comment');
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

const getLikes = async (activitiesId) => {
    if (activitiesId) {
        try {
            const like = Like.find({ 'object_id': { $in: activitiesId } });

            return like;
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The activities id field is empty.' };
    }
};

const getComments = async (activitiesId) => {
    if (activitiesId) {
        try {
            const comment = Comment.find({ 'activity_id': { $in: activitiesId } });

            return comment;
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The activities id field is empty.' };
    }
};

const getUserInfoOfComment = (commentActivity) => {
    if (commentActivity) {
        try {
            const userId = commentActivity.map((item) => item.created_by);
            const users = User.find({ '_id': { $in: userId } });

            return users;
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The comment activity field is empty.' };
    }
};

const newsFeed = async (req, res) => {
    const myActivities = await getMyActivities(req.user.username);
    const followingActivities = await getFollowingActivities(req.user.id);
    const followingInfo = await getFollowingInfo(req.user.id);
    const myInfo = await getUserInfo(req.user.id);

    if (myActivities.error) {
        return res.status(400).json({ 'message': myActivities.error });
    } else if (followingActivities.error) {
        return res.status(400).json({ 'message': followingActivities.error });
    } else if (myInfo.error) {
        return res.status(400).json({ 'message': myInfo.error });
    } else if (followingInfo.error) {
        return res.status(400).json({ 'message': followingInfo.error });
    } else if (getLikes.error) {
        return res.status(400).json({ 'message': getLikes.error });
    } else if (getComments.error) {
        return res.status(400).json({ 'message': getComments.error });
    } else if (getUserInfoOfComment.error) {
        return res.status(400).json({ 'message': getUserInfoOfComment.error });
    } else {
        const concatActivities = _.concat(myActivities, followingActivities);

        const dateFormat = item => moment(item.created_at).format('YYYY-MM-DD');
        const groupDate = _.groupBy(concatActivities, dateFormat);
        const activityId = concatActivities.map((item) => item._id);
        const likeActivity = await getLikes(activityId);
        const commentActivity = await getComments(activityId);
        const commentId = commentActivity.map((item) => item._id);
        const likeComment = await (getLikes(commentId));
        const userInfo = await (getUserInfoOfComment(commentActivity));

        let sortDataByDate = {};

        const sortData = Object
            .keys(groupDate)
            .sort((a, b) => moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate());

        const fullName = _.concat(followingInfo, myInfo).map(user => {
            return {
                avatar: user.avatar ? user.avatar : '',
                full_name: user.full_name,
                username: user.username
            }
        });

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

                if (likeActivity.length) {
                    let userLikedActivity = [];

                    for (like of likeActivity) {
                        if ((like.object_id).toString() === (item._id).toString() && like.created_by === req.user.id) {
                            newData.like = { status: true }
                        }

                        if ((like.object_id).toString() === (item._id).toString()) {
                            userLikedActivity.push(like.created_by);
                            newData.like.quantity = userLikedActivity.length;
                        }
                    }
                }

                if (commentActivity.length) {
                    for (comment of commentActivity) {
                        const commentData = {};

                        if ((comment.activity_id).toString() === (item._id).toString()) {
                            commentData._id = comment._id;
                            commentData.body = comment.body;
                            commentData.edited = comment.edited ? comment.edited : false;
                            commentData.like = {
                                quantity: 0,
                                status: false
                            };

                            if (userInfo.length) {
                                for (user of userInfo) {
                                    if ((user._id).toString() === (comment.created_by).toString()) {
                                        commentData.username = user.username;
                                        commentData.full_name = user.full_name;
                                        commentData.updatedAt = comment.updatedAt;

                                        if (user.avatar && user.avatar.location) {
                                            commentData.avatar = user.avatar.location
                                        }
                                    }
                                }
                            }

                            if (likeComment.length) {
                                let userLikedComment = [];

                                for (like of likeComment) {
                                    if ((like.object_id).toString() === (comment._id).toString() && like.created_by === req.user.id) {
                                        commentData.like = { status: true }
                                    }

                                    if ((like.object_id).toString() === (comment._id).toString()) {
                                        userLikedComment.push(like.created_by);
                                        commentData.like.quantity = userLikedComment.length;
                                    }
                                }
                            }
                        }

                        if (!_.isEmpty(commentData)) {
                            newData.comments.push(commentData);
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
