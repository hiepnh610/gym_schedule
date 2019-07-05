const User = require('../model/user');

const followUser = (req, res) => {
    if (req.params.username) {
        const query = { _id: req.user.id };
        const userFollowing = req.params.username;

        User.findOneAndUpdate(
            query,
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

const unFollowUser = (req, res) => {
    if (req.params.username) {
        const query = { _id: req.user.id };
        const param = req.params.username;

        User.findOne(query, (err, user) => {
            if (err) return res.status(400).json(err);

            if (user.following) {
                for (const u of user.following) {
                    if (param === u) {
                        const indexOfUser = user.following.indexOf(u);
                        user.following.splice(indexOfUser)

                        user.save(err => {
                            if (err) return res.status(400).json(err);

                            res.status(200).json({ 'message': 'UnFollow.' });
                        });
                    }
                }
            }
        });
    }
};

const getListFollowing = (req, res) => {
};

const getListFollower = (req, res) => {
};

module.exports = {
    followUser,
    unFollowUser,
    getListFollowing,
    getListFollower
};
