const express = require('express');
const router  = express.Router();

const User = require('../model/user');

let user = {};

const getInfo = (req, res) => {
    User.find({ '_id': req.query.id })
    .populate('_id')
    .exec(function (err, userInfo) {
       if(err) return res.status(400).send(err);

       res.status(200).json(userInfo);
    });
};

const updateInfo = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if(err) return res.send(err);

        user.set({
            age: req.body.age,
            fullName: req.body.fullName,
            gender: req.body.gender,
            height: req.body.height,
            password: req.body.password,
            weight: req.body.weight
        });

        user.save((err, user) => {
            if(err) return res.send(err);

            res.status(200).json(user);
        });
    });
};

module.exports = { getInfo, updateInfo };
