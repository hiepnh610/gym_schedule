const multer = require('multer');
const path   = require('path');
const mkdirp = require('mkdirp');

const User = require('../model/user');

const uploadPath = 'images';
const multerConfig = {
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    fileFilter: function(req, file, next) {
        if(!file) next();

        const image = file.mimetype.startsWith('image/');

        if(image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");
            return next();
        }
    }
};

const storage = multer.diskStorage(multerConfig);

const upload = multer({ storage: storage }).single('avatar');

mkdirp.sync(uploadPath);

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(201).send(req.file);

        User.findById(req.body.userId, (err, user) => {
            if(err) return res.send(err);

            user.set({
                avatar: req.file
            });

            user.save((err, user) => {
                if(err) return res.status(400).end(err);

                res.status(201).end('Update Successfully!');
            });
        });
    })
}

module.exports = uploadImage;
