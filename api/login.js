const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const login = (req, res) => {
    if(req.body.email && req.body.password) {
        User.findOne({ 'email': req.body.email }, (err, user) => {
            if(err) return res.send(err);

            if(!user) return res.json({ loginMessage: 'No user found.' });

            if(!user.validPassword(req.body.password)) return res.json({ loginMessage: 'Oops! Wrong password.' });

            const resData = {
                id: user._id,
                email: user.email,
                name: user.fullName,
                authenticate: true
            }

            return res.json(resData);
        });
    }
};

module.exports = login;
