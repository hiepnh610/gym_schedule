const Comment = require('../model/comment');
const User = require('../model/user');

let comment = {};

const getUserInfo = (userId) => {
    const query = { _id: userId };

    return User.findOne(query).exec();
};

const createComment = async (req, res) => {
    if (req.body.activityId && req.body.body) {
        const userInfo = await (getUserInfo(req.user.id));

        comment = new Comment({
            activity_id: req.body.activityId,
            body: req.body.body,
            created_by: req.user.id
        });

        comment.save((err, comment) => {
            if (err) return res.status(400).send(err);

            const resData = {
                _id: comment._id,
                activity_id: comment.activity_id,
                body: comment.body,
                full_name: userInfo.full_name,
                updatedAt: comment.updatedAt,
                username: userInfo.username,
                like: {
                    quantity: 0,
                    status: false
                }
            }

            if (userInfo.avatar && userInfo.avatar.location) {
                resData.avatar = userInfo.avatar.location;
            }

            res.status(201).json(resData);
        });
    }
};

const deleteComment = (req, res) => {
    if (req.params.comment_id) {
        const query = { '_id': req.params.comment_id };

        Comment.deleteOne(query, (err) => {
            if(err) return res.status(400).send(err);

            res.status(200).json({ message: 'Comment deleted.' });
        });
    }
};

const updateComment = (req, res) => {
    if (req.params.comment_id) {
        if (req.body.body) {
            const query = req.params.comment_id;

            Comment.findById(query, (err, comment) => {
                if(err) return res.status(400).send(err);

                if(!comment) return res.status(400).send({ message: 'Comment not found.' });

                comment.set({
                    body: req.body.body,
                    edited: true
                });

                comment.save((err, comment) => {
                    if(err) return res.status(400).send(err);

                    res.status(200).json(comment);
                });
            });
        } else {
            deleteComment(req, res);
        }
    }
};

module.exports = {
    createComment,
    deleteComment,
    updateComment
};
