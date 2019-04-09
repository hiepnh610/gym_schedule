const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const User = require('../model/user');

const mailer = require('../mail/mailer');
const signToken = require('../auth/signToken');

const comparePassword = User.schema.methods.comparePassword;
const generateHash = User.schema.methods.generateHash;

let user = {};

const getInfo = (req, res) => {
    if (req.user) {
        const query = { '_id': req.user.id };

        User.find(query)
        .exec((err, userInfo) => {
            if (err) return res.status(400).send(err);

            if (userInfo.length > 0) {
                const newUserInfo = {
                    _id: userInfo[0]._id,
                    email: userInfo[0].email,
                    full_name: userInfo[0].full_name,
                    username: userInfo[0].username
                };

                if (userInfo[0].dob ) {
                    newUserInfo.dob = userInfo[0].dob
                }

                if (userInfo[0].gender ) {
                    newUserInfo.gender = userInfo[0].gender
                }

                if (userInfo[0].height ) {
                    newUserInfo.height = userInfo[0].height
                }

                if (userInfo[0].weight ) {
                    newUserInfo.weight = userInfo[0].weight
                }

                if (userInfo[0].avatar ) {
                    newUserInfo.avatar = userInfo[0].avatar
                }

                if (userInfo[0].bio ) {
                    newUserInfo.bio = userInfo[0].bio
                }

                if (userInfo[0].address ) {
                    newUserInfo.address = userInfo[0].address
                }

                res.status(200).json(newUserInfo);
            } else {
                res.status(400).json({ message: 'Error' });
            }
        });
    }
};

const updateInfo = (req, res) => {
    if (!req.body.full_name) return res.status(400).json({ message: 'Your name cannot be blank.' });

    if (isNaN(req.body.height)) return res.status(400).json({ message: 'The height field must be a valid height.' });

    if (isNaN(req.body.weight)) return res.status(400).json({ message: 'The weight field must be a valid weight.' });

    if (req.body.gender !== 'Male' && req.body.gender !== 'Female') return res.status(400).json({ message: 'The gender field must be a valid gender.' });

    const query = req.user.id;

    User.findById(query, (err, user) => {
        if (err) return res.status(400).send(err);

        user.set({
            address: req.body.address,
            bio: req.body.bio,
            dob: req.body.dob,
            full_name: req.body.full_name,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight
        });

        user.save((err, user) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ message: 'Update Successfully!' });
        });
    });
};

const modifyPassword = (req, res) => {
    if (req.user.id) {
        const query = req.user.id;

        User.findById(query, (err, user) => {
            if (err) return res.status(400).send(err);

            const current_password = req.body.current_password;
            const compare_password = comparePassword(current_password, user.password);

            if (compare_password) {
                const new_password = generateHash(req.body.new_password);

                user.set({
                    password: new_password
                });

                user.save((err, user) => {
                    if (err) return res.send(err);

                    res.status(200).json({ message: 'Update Successfully!' });
                });
            } else {
                res.status(400).json({ message: 'Current password does not match.' });
            }
        });
    }
};

const forgotPassword = (req, res) => {
    if (req.body.email) {
        const email = req.body.email;
        const tokenResetPassword = signToken({ email: req.body.email });

        mailer.sendMailForgotPassword(email, tokenResetPassword);

        res.status(200).json({ message: 'Email forgot password has been sent.' });
    } else {
        res.status(400).json({ message: 'The email field cannot be blank.' });
    }
};

const resetPassword = (req, res) => {
    if (!req.body.token) res.status(400).json({ message: 'No token provided.' });

    if (!req.body.password) res.status(400).json({ message: 'The password field cannot be blank.' });

    if (req.body.password !== req.body.confirmPassword) res.status(400).json({ message: 'Password does not match the confirm password.' });

    const token = req.body.token;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Failed to authenticate token.'
        });

        if (decoded) {
            const query = { email: decoded.email };

            User.findOne(query, (err, user) => {
                if (err) return res.status(400).send(err);

                const new_password = generateHash(req.body.password);

                user.set({
                    password: new_password
                });

                user.save((err) => {
                    if (err) return res.send(err);

                    mailer.sendMailResetPasswordSuccess(user.email, user.full_name);

                    res.status(200).json({ message: 'Update Successfully!' });
                });
            });
        }
    });
};

module.exports = {
    getInfo,
    updateInfo,
    modifyPassword,
    forgotPassword,
    resetPassword
};
