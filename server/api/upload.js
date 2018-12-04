const aws      = require('aws-sdk');
const multer   = require('multer');
const multerS3 = require('multer-s3');
const path     = require('path');

const User = require('../model/user');

const s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

const bucket = 'gymschedule';

const multerS3Config = multerS3({
    s3: s3,
    bucket: bucket,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const imageFilter = (req, file, next) => {
    if(!file) next();

    const image = file.mimetype.startsWith('image/');

    if(image) {
        next(null, true);
    } else {
        return next(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: multerS3Config,

    fileFilter: imageFilter
}).single('avatar');

const uploadImage = (req, res) => {
    upload(req, res, (error) => {
        if (error) return res.status(400).send(error);

        const query = req.body.userId;

        User.findById(query, (err, user) => {
            if(err) return res.status(400).send(err);

            user.set({
                avatar: req.file
            });

            user.save((err, user) => {
                if(err) return res.status(400).send(err);

                res.status(201).send(user);
            });
        });
    })
};

module.exports = uploadImage;
