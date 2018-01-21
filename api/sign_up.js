const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const initSignUp = (req, res) => {
    if (!req.body.email && !req.body.fullName && !req.body.password) {
        return res.status(400).json({ message: 'Email or password cannot be blank.' });
    } else if (req.body.password_confirm !== req.body.password) {
        return res.status(400).json({ message: 'Password does not match the confirm password.' });
    } else {
        signUp(req, res);
    }
};

const signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        password_confirm: req.body.password
    });

    // Hash pass
    user.password = user.generateHash(user.password);
    user.password_confirm = user.generateHash(user.password_confirm);

    user.save((err, prod) => {
        if(err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: 'This email already exists.' });
            }
            return res.status(400).json({ message: 'Error happened.' });
        }

        return res.status(201).json({ message: 'User created!' });
    });
};

module.exports = initSignUp;
