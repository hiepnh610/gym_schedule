const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const login = (req, res) => {
    if(req.body.email && req.body.password) {
        User.findOne({ 'email': req.body.email }, (err, user) => {
            if(err) return res.status(400).send(err);

            if(!user) return res.status(400).json({ loginMessage: 'No user found.' });

            if(!user.validPassword(req.body.password)) return res.status(400).json({ loginMessage: 'Oops! Wrong password.' });

            const resData = {
                id: user._id,
                email: user.email,
                name: user.fullName,
                authenticate: true
            }

            return res.status(200).json(resData);
        });
    } else {
        return res.status(400).json({ message: 'Email or password cannot be blank.' });
    }
};

module.exports = login;
