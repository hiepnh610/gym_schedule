const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).json({
        message: 'No token provided.'
    });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Failed to authenticate token.'
        });

        if (decoded) { req.user = decoded }

        next();
    });
};

module.exports = verifyToken;
