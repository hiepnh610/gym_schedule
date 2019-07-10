const User = require('../model/user');

const followUser = (req, res) => {
    if (req.params.username) {
        const query = { _id: req.user.id };
        const userFollowing = req.params.username;

        User.findOneAndUpdate(
            query,
            { $addToSet: { following: userFollowing } },
            { upsert: true },
            async (err, user) => {
                if (err) return res.status(400).send(err);

                if (!user) return res.status(400).json({ 'message': 'No user found.' });

                const response = await saveFollowerToUser(userFollowing, req.user.username);

                if (response.error) {
                    return res.status(400).json({ 'message': response.error });
                } else {
                    return res.status(200).json({ 'message': 'Followed.' });
                }
            });
    } else {
        res.status(400).json({ 'message': 'Username cannot be blank.' });
    }
};

const saveFollowerToUser = async (username, follower) => {
    try {
        const query = { username: username };
        const user = await User.findOneAndUpdate(
            query,
            { $addToSet: { follower: follower } },
            { upsert: true });

        if (!user) return { error: 'No user found.' };

        return user;
    } catch (e) {
        return { error: e };
    }
};

const unFollowUser = (req, res) => {
    if (req.params.username) {
        const query = { _id: req.user.id };
        const username = req.params.username;

        User.update(
            query,
            { $pull: { following: username } },
            {},
            async (e, user) => {
                if (e) return res.status(400).json(e);

                if (!user) return res.status(400).json({ 'message': 'No user found.' });

                const response = await removeFollowerInUser(username, req.user.username);

                if (response.error) {
                    return res.status(400).json({ 'message': response.error });
                } else {
                    return res.status(200).json({ 'message': 'UnFollow.' });
                }
            });
    }
};

const removeFollowerInUser = async (username, follower) => {
    try {
        const query = { username: username };
        const user = await User.update(
            query,
            { $pull: { follower: follower } },
            {});

        if (!user) return { error: 'No user found.' };

        return user;
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    followUser,
    unFollowUser
};
