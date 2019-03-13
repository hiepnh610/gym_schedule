const validator = require('validator');

const User = require('../model/user');

const signToken = require('../auth/signToken');

const login = (req, res) => {
    if (!req.body.username) {
        return res.status(400).json({ message: 'The username field cannot be blank.' })
    } else if (!req.body.password) {
        return res.status(400).json({ message: 'Email or password cannot be blank.' });
    } else {
        const query = { 'username': req.body.username };

        if (req.body.username.length < 8) return res.status(400).json({ message: 'The username field must be at least 8 characters.' });

        if (req.body.password.length < 8) return res.status(400).json({ message: 'The password field must be at least 8 characters.' });

        User.findOne(query, (err, user) => {
            if(err) return res.status(400).send(err);

            if(!user) return res.status(400).json({ message: 'No user found.' });

            if(!user.validPassword(req.body.password)) return res.status(400).json({ message: 'Oops! Wrong password.' });

            const response = {
                _id: user._id,
                email: user.email,
                full_name: user.full_name,
                token: signToken(user._id),
                username: user.username
            }

            if (user.dob ) {
                response.dob = user.dob
            }

            if (user.gender ) {
                response.gender = user.gender
            }

            if (user.height ) {
                response.height = user.height
            }

            if (user.weight ) {
                response.weight = user.weight
            }

            if (user.avatar ) {
                response.avatar = user.avatar
            }

            if (user.bio ) {
                response.bio = user.bio
            }

            if (user.address ) {
                response.address = user.address
            }

            return res.status(200).json(response);
        });
    }
};

module.exports = login;
