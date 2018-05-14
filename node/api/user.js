const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const comparePassword = User.schema.methods.comparePassword;
const generateHash = User.schema.methods.generateHash;

let user = {};

const getInfo = (req, res) => {
    User.find({ '_id': req.query.id })
    .populate('_id')
    .exec(function (err, userInfo) {
       if(err) return res.status(400).send(err);

       const newUserInfo = {
           _id: userInfo[0]._id,
           email: userInfo[0].email,
           fullName: userInfo[0].fullName,
           gender: userInfo[0].gender,
           height: userInfo[0].height,
           weight: userInfo[0].weight
       };

       res.status(200).json(newUserInfo);
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
            // password: req.body.password,
            weight: req.body.weight
        });

        user.save((err, user) => {
            if(err) return res.send(err);

            res.status(200).json({ message: 'Update Successfully!' });
        });
    });
};

const modifyPassword = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if(err) return res.send(err);

        const current_password = req.body.current_password;
        const compare_password = comparePassword(current_password, user.password);

        if(compare_password) {
            const new_password = generateHash(req.body.new_password);

            user.set({
                password: new_password
            });

            user.save((err, user) => {
                if(err) return res.send(err);
    
                res.status(200).json({ message: 'Update Successfully!' });
            });
        } else {
            res.status(400).json({ message: 'Current password does not match.' });
        }
    });
}

module.exports = { getInfo, updateInfo, modifyPassword };
