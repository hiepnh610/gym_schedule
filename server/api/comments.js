const Comment = require('../model/comment');
const User = require('../model/user');

const createComment = async (req, res) => {
    if (req.body.activityId && req.body.body) {
        const userInfo = await (getUserInfo(req.user._id));

        comment = new Comment({
            activity_id: req.body.activityId,
            body: req.body.body,
            created_by: req.user._id
        });

        comment.save((err, comment) => {
            if (err) return res.status(400).send(err);

            const resData = {
                activity_id: comment.activity_id,
                body: comment.body,
                full_name: userInfo.full_name,
                updatedAt: comment.updatedAt,
                username: userInfo.username
            }

            if (userInfo.avatar && userInfo.avatar.location) {
                resData.avatar = userInfo.avatar.location;
            }

            res.status(201).json(resData);
        });
    }
};

const getUserInfo = (userId) => {
    const query = { _id: userId };

    return User.findOne(query).exec();
};

module.exports = {
    createComment
};
