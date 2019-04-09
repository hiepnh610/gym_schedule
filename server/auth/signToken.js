const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const signToken = (user) => {
    const token = jwt.sign(user, secretKey, {
        expiresIn: 86400
    });

    return token;
};

module.exports = signToken;
