const Like = require('../model/like');

const likeActivity = (req, res) => {
    like = new Like({
        created_by: req.user._id,
        object_id: req.body.object_id,
        object_type: req.body.object_type
    });

    like.save((err) => {
        if (err) return res.status(400).send(err);

        res.status(201).json({ 'message': 'Liked' });
    });
};

const unlikeActivity = (req, res) => {
    const query = { 'object_id': req.body.object_id };

    Like.deleteOne(query, (err) => {
        if(err) return res.status(400).send(err);

        res.status(200).json({ message: 'Unlike.' });
    });
};

const checkLikeInActivity = (req, res) => {
    if (req.user._id && req.body.object_id) {
        const query = {
            'object_id': req.body.object_id,
            'created_by': req.user._id
        };

        Like.findOne(query, (err, like) => {
            if (err) return res.status(400).send(err);

            if (like) {
                unlikeActivity(req, res);
            } else {
                likeActivity(req, res);
            }
        });
    }
};

module.exports = checkLikeInActivity;
