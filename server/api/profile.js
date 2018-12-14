const User = require('../model/user');

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
                res.status(400).json({ message: 'Error Happened.' });
            }
        });
    }
};

module.exports = getInfo;
