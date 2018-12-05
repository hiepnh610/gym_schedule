const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const signToken = (userId) => {
    const _id = {
        id: userId
    };

    const token = jwt.sign(_id, secretKey, {
        expiresIn: 86400
    });

    return token;
};

module.exports = signToken;
