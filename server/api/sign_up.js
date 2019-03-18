const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../model/user');

const signToken = require('../auth/signToken');

const initSignUp = (req, res) => {
    if (!req.body.email) return res.status(400).json({ message: 'The email field cannot be blank.' });

    if (!req.body.username) return res.status(400).json({ message: 'The username field cannot be blank.' });

    if (!req.body.full_name) return res.status(400).json({ message: 'The full name field cannot be blank.' });

    if (!req.body.password) return res.status(400).json({ message: 'The password field cannot be blank.' });

    if (req.body.username.length < 8) return res.status(400).json({ message: 'The username field must be at least 8 characters.' });

    if (req.body.password.length < 8) return res.status(400).json({ message: 'The password field must be at least 8 characters.' });

    if (req.body.confirm_password !== req.body.password) return res.status(400).json({ message: 'Password does not match the confirm password.' });

    if (!validator.isEmail(req.body.email)) return res.status(400).json({ message: 'The email field must be a valid email.' });

    signUp(req, res);
};

const signUp = (req, res) => {
    findUnique(req.body.email, req.body.username, (err, isUnique, message) => {
        let status;

        if (err) {
            return res.status(500).json({ message: 'Error happened.' });
        } else if (!isUnique && message) {
            return res.status(400).json({ message: message });
        } else {
            const user = new User({
                email: req.body.email,
                full_name: req.body.full_name,
                password: req.body.password,
                username: req.body.username
            });

            // Hash pass
            user.password = user.generateHash(user.password);

            saveUser(res, user);
        }
    });
};

const findUnique = (email, username, cb) => {
    User.findOne({
        email: email
    }, (err, email) => {
        if (err) cb(err)
        else if (email) {
            const message = 'This email already exists.';

            cb(null, false, message);
        } else {
            User.findOne({
                username: username
            }, (err, username) => {
                if (err) cb(err);
                else if (username) {
                    const message = 'This username already exists.';

                    cb(null, false, message);
                }
                else cb(null, true);
            });
        }
    });
};

const saveUser = (res, user) => {
    user.save((err, user) => {
        if (err) return res.status(400).json({ message: 'Error happened.' });

        const resData = {
            id: user._id,
            name: user.full_name,
            username: user.username,
            auth: true,
            token: signToken(user._id, user.username)
        }

        return res.status(201).json(resData);
    });
};

module.exports = initSignUp;
