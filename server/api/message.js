const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);

const Message = require('../model/message');

const getAllMessage = (req, res) => {
    if (req.query.room_id) {
        const room_id = { 'room_id': req.query.room_id };

        Message.find(room_id, (err, messages) => {
            if(err) return res.status(400).send(err);

            res.status(200).json(messages);
        });
    } else {
        return res.status(400).json({ 'message': 'No id room provided.' });
    }
};

const addMessage = (req, res) => {
    if (!req.body.room_id) {
        return res.status(400).json({ 'message': 'No id room provided.' });
    }

    if (!req.body.message) {
        return res.status(400).json({ 'message': 'No message provided.' });
    }

    const room_id = req.body.room_id;
    const message_content = req.body.message;

    let message = new Message({
        created_by: req.user.username,
        message: message_content,
        room_id: room_id
    });

    message.save((err, message) => {
        if (err) return res.status(400).send(err);

        io.sockets.in(room_id).emit('message', message);

        res.status(201).json(message);
    });
};

module.exports = {
    getAllMessage,
    addMessage
};
