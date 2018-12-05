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

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(403).json({
    auth: false,
    message: 'No token provided.'
  });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(500).json({
      auth: false,
      message: 'Failed to authenticate token.'
    });

    next();
  });
};

module.exports = {
  signToken,
  verifyToken
};
