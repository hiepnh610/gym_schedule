const multer = require('multer');
const path   = require('path');
const mkdirp = require('mkdirp');

const User = require('../model/user');

const uploadPath = 'images';

const storageConfig = {
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
};

const imageFilter = (req, file, next) => {
    if(!file) next();

    const image = file.mimetype.startsWith('image/');

    if(image) {
        next(null, true);
    } else {
        return next(new Error('Only image files are allowed!'), false);
    }
};

const storage = multer.diskStorage(storageConfig);

const upload = multer({
    storage: storage,

    fileFilter: imageFilter
}).single('avatar');

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        User.findById(req.body.userId, (err, user) => {
            if(err) return res.send(err);

            user.set({
                avatar: req.file
            });

            user.save((err, user) => {
                if(err) return res.status(400).send(err);

                res.status(201).send(user);
            });
        });
    })
}

mkdirp.sync(uploadPath);

module.exports = uploadImage;
