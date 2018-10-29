const User = require('../model/user');

const comparePassword = User.schema.methods.comparePassword;
const generateHash = User.schema.methods.generateHash;

let user = {};

const getInfo = (req, res) => {
    if (req.query.id) {
        User.find({ '_id': req.query.id })
        // .populate('_id')
        .exec(function (err, userInfo) {
            if(err) return res.status(400).send(err);

            if (userInfo.length > 0) {
                const newUserInfo = {
                    _id: userInfo[0]._id,
                    email: userInfo[0].email,
                    full_name: userInfo[0].full_name
                };

                if(userInfo[0].dob ) {
                    newUserInfo.dob = userInfo[0].dob
                }

                if(userInfo[0].gender ) {
                    newUserInfo.gender = userInfo[0].gender
                }

                if(userInfo[0].height ) {
                    newUserInfo.height = userInfo[0].height
                }

                if(userInfo[0].weight ) {
                    newUserInfo.weight = userInfo[0].weight
                }

                if(userInfo[0].avatar ) {
                    newUserInfo.avatar = userInfo[0].avatar
                }

                res.status(200).json(newUserInfo);
            } else {
                res.status(400).json({ message: 'Error' });
            }
        });
    }
};

const updateInfo = (req, res) => {
    if (!req.body.full_name) return res.status(400).json({ message: 'The email cannot be blank.' });

    if (isNaN(req.body.height)) return res.status(400).json({ message: 'The height field must be a valid height.' });

    if (isNaN(req.body.weight)) return res.status(400).json({ message: 'The weight field must be a valid weight.' });

    if (req.body.gender !== 'Male' && req.body.gender !== 'Female') return res.status(400).json({ message: 'The gender field must be a valid gender.' });

    User.findById(req.params.user_id, (err, user) => {
        if(err) return res.status(400).send(err);

        user.set({
            dob: req.body.dob,
            full_name: req.body.full_name,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight
        });

        user.save((err, user) => {
            if(err) return res.status(400).send(err);

            res.status(200).json({ message: 'Update Successfully!' });
        });
    });
};

const modifyPassword = (req, res) => {
    if (req.params.user_id) {
        User.findById(req.params.user_id, (err, user) => {
            if(err) return res.status(400).send(err);

            const current_password = req.body.current_password;
            const compare_password = comparePassword(current_password, user.password);

            if(compare_password) {
                const new_password = generateHash(req.body.new_password);

                user.set({
                    password: new_password
                });

                user.save((err, user) => {
                    if(err) return res.send(err);

                    res.status(200).json({ message: 'Update Successfully!' });
                });
            } else {
                res.status(400).json({ message: 'Current password does not match.' });
            }
        });
    }
}

module.exports = { getInfo, updateInfo, modifyPassword };
