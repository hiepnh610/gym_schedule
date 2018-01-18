const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const signUp = (req, res) => {
    if (req.body.email && req.body.full_name && req.body.password && (req.body.password_confirm === req.body.password)) {
        const user = new User({
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender,
            height: req.body.height,
            full_name: req.body.full_name,
            password: req.body.password,
            password_confirm: req.body.password,
            weight: req.body.weight
        });

        // Hash pass
        user.password = user.generateHash(user.password);
        user.password_confirm = user.generateHash(user.password_confirm);

        user.save((err) => {
            if(err) return res.status(400).send(err);

            res.status(201).json({ message: 'User created!' });
        });
    }
};

module.exports = signUp;
