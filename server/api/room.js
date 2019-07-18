const Room = require('../model/room');

const checkRoomIsExist = (users) => {
    if (users) {
        try {
            return Room.find({ users: { $all: users } });
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The username field is empty.' };
    }
};

const createNewRoom = users => {
    if (users) {
        try {
            let room = new Room({
                users: users
            });

            return room.save();
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The users field is empty.' };
    }
};

const init = async (req, res) => {
    if (req.body.username) {
        const myUserName =  req.user.username;
        const targetUsername = req.body.username;

        targetUsername.push(myUserName);

        const rooms = await checkRoomIsExist(targetUsername);

        if (rooms.error) {
            return res.status(400).json({ 'message': rooms.error });
        }

        if (rooms.length) {
            res.status(200).json(rooms);
        } else {
            const newRoom = await createNewRoom(targetUsername);

            res.status(201).json(newRoom);
        }
    } else {
        return res.status(400).json({ 'message': 'The username field is empty.' });
    }
};

module.exports = {
    init
};
