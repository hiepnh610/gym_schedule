const validator = require('validator');

const User = require('../model/user');

const initSignUp = (req, res) => {
    if (!req.body.email) return res.status(400).json({ message: 'The email cannot be blank.' });

    if (!req.body.full_name) return res.status(400).json({ message: 'The name cannot be blank.' });

    if (!req.body.password) return res.status(400).json({ message: 'The password cannot be blank.' });

    if (req.body.password.length < 8) return res.status(400).json({ message: 'The password field must be at least 8 characters.' });

    if (req.body.password_confirm !== req.body.password) return res.status(400).json({ message: 'Password does not match the confirm password.' });

    if (!validator.isEmail(req.body.email)) return res.status(400).json({ message: 'The email field must be a valid email.' });

    signUp(req, res);
};

const signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        full_name: req.body.full_name,
        password: req.body.password
    });

    // Hash pass
    user.password = user.generateHash(user.password);

    user.save((err, user) => {
        if (err) {
            if (err.code === 11000) return res.status(400).json({ message: 'This email already exists.' });

            return res.status(400).json({ message: 'Error happened.' });
        }

        const resData = {
            id: user._id,
            email: user.email,
            name: user.full_name,
            authenticate: true
        }

        return res.status(201).json(resData);
    });
};

module.exports = initSignUp;
