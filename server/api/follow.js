const User = require('../model/user');

const followUser = (req, res) => {
    if (req.params.username) {
        const param = { _id: req.user.id };
        const userFollowing = req.params.username;

        User.findOneAndUpdate(
            param,
            { $addToSet: { following: userFollowing } },
            { upsert: true },
            (err, user) => {
                if (err) return res.status(400).send({ message: 'Error happened.' });

                res.status(200).json({ 'message': 'Followed.' });
            });
    } else {
        res.status(400).json({ 'message': 'Username cannot be blank.' });
    }
};

const getListFollowing = (req, res) => {
};

const getListFollower = (req, res) => {
};

module.exports = {
    followUser,
    getListFollowing,
    getListFollower
};
