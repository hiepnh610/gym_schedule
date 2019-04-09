const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const User = require('../model/user');
const email = require('../mail/mailer');

let user = {};

const verifyEmail = (req, res) => {
    if (!req.body.token) return res.status(403).json({ 'message': 'No token provided.' });

    const token = req.body.token;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Failed to authenticate token.'
        });

        if (decoded) {
            const query = decoded._id;

            User.findById(query, (err, user) => {
                if (err) return res.status(400).send(err);

                if (user.verified) {
                    res.status(301).json({ message: 'Your email already verified.' });
                } else {
                    user.set({
                        verified: true
                    });

                    user.save((err, user) => {
                        if (err) return res.status(400).send(err);

                        email.sendEmailAfterVerified(user.email, user.full_name);

                        res.status(200).json({ message: 'Thanks for verifying your email address.' });
                    });
                }
            });
        }
    });
};

module.exports = verifyEmail;
