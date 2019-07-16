const Message = require('../model/message');

const getAllMessage = (req, res) => {
    res.status(200).json({ 'message': 'Done' });
};

const addMessage = (req, res) => {};

module.exports = {
    getAllMessage,
    addMessage
};
