const validator = require('validator');

const User = require('../model/user');

const signToken = require('../auth/signToken');

const login = (req, res) => {
    if(req.body.email && req.body.password) {
        const query = { 'email': req.body.email };

        if (!validator.isEmail(req.body.email)) return res.status(400).json({ message: 'The email field must be a valid email.' });

        if (req.body.password.length < 8) return res.status(400).json({ message: 'The password field must be at least 8 characters.' });

        User.findOne(query, (err, user) => {
            if(err) return res.status(400).send(err);

            if(!user) return res.status(400).json({ message: 'No user found.' });

            if(!user.validPassword(req.body.password)) return res.status(400).json({ message: 'Oops! Wrong password.' });

            const response = {
                id: user._id,
                email: user.email,
                name: user.full_name,
                auth: true,
                token: signToken(user._id)
            }

            return res.status(200).json(response);
        });
    } else {
        return res.status(400).json({ message: 'Email or password cannot be blank.' });
    }
};

module.exports = login;
