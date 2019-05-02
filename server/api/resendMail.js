const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const User = require('../model/user');
const email = require('../mail/mailer');
const signToken = require('../auth/signToken');

const resendVerificationMail = (req, res) => {
    if (!req.body.token) return res.status(403).json({ 'message': 'No token provided.' });

    const token = req.body.token;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Failed to authenticate token.'
        });

        if (decoded) {
            const query = decoded.id;

            User.findById(query, (err, user) => {
                if (err) return res.status(400).send(err);

                const tokenForVerify = signToken({
                    id: user._id
                });

                email.sendVerifyEmail(user.email, user.full_name, tokenForVerify);

                return res.status(200).json({ message: 'Sent.' });
            });
        }
    });
};

module.exports = { resendVerificationMail };
