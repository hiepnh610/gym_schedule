const Room = require('../model/room');
const User = require('../model/user');

const checkUsername = (username) => {
    if (!username) {
        return { error: 'The username field is empty.' };
    }

    try {
        return User.find({ username: username });
    } catch (e) {
        return { error: e };
    }
};

const getSpecificRoom = (req, res) => {
    const username = req.user.username;

    Room.find({ users: { $all: [username] } }, (err, rooms) => {
        if (err) res.status(400).send(err);

        res.status(200).json(rooms);
    });
};

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

const createNewRoomWhenNotExist = users => {
    if (users) {
        try {
            let room = new Room({
                users: users,
                hide: false
            });

            return room.save();
        } catch (e) {
            return { error: e };
        }
    } else {
        return { error: 'The users field is empty.' };
    }
};

const createNewRoom = async (req, res) => {
    if (req.body.username) {
        const myUserName    = [req.user.username];
        const otherUsername = req.body.username;
        const listUsername  = myUserName.concat(otherUsername);

        const rooms = await checkRoomIsExist(listUsername);
        const hasUsername = await checkUsername(otherUsername);

        if (rooms.error) {
            return res.status(400).json({ 'message': rooms.error });
        }

        if (hasUsername.error) {
            return res.status(400).json({ 'message': rooms.error });
        }

        if (!hasUsername.length) {
            return res.status(400).json({ 'message': 'No user found.' });
        }

        if (rooms.length) {
            res.status(200).json(rooms[0]);
        } else {
            const newRoom = await createNewRoomWhenNotExist(listUsername);

            if (newRoom.error) {
                return res.status(400).json({ 'message': newRoom.error });
            } else {
                res.status(201).json(newRoom);
            }
        }
    } else {
        return res.status(400).json({ 'message': 'The username field is empty.' });
    }
};

const getAllRoom = async (req, res) => {
    const myUserName = req.user.username;

    Room.find({ users: { $all: [myUserName] } }, async (err, rooms) => {
        if (err) return res.status(400).send(err);

        let listUsername = [];
        let newRooms = rooms.map(room => {
            let data = {
                _id: room._id
            };

            room.users.forEach(user => {
                if (user !== myUserName) {
                    listUsername.push(user);
                    data.username = user;
                }
            });

            return data;
        });

        const listUserData = await getUserInfo(listUsername);

        if (listUserData.error) {
            return res.status(400).json({ 'message': rooms.error });
        }

        let newListRoom = [];

        newRooms.forEach(room => {
            listUserData.forEach(user => {
                if (user.username === room.username) {
                    newListRoom.push({
                        _id: room._id,
                        avatar: user.avatar ? user.avatar : '',
                        full_name: user.full_name,
                        username: user.username
                    });
                }
            });
        });

        res.status(200).json(newListRoom);
    });
};

const getUserInfo = (username) => {
    if (!username) {
        return { error: 'The username field is empty.' };
    }

    try {
        return User.find({ username: { $in: username } });
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    createNewRoom,
    getSpecificRoom,
    getAllRoom
};
