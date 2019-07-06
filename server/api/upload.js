const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const User = require('../model/user');
const Images = require('../model/images');

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
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = (req, file, next) => {
  if (!file) next();

  const image = file.mimetype.startsWith('image/');

  if (image) {
    next(null, true);
  } else {
    return next(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: multerS3Config,

  fileFilter: imageFilter
}).single('image');

const uploadImage = (req, res) => {
  upload(req, res, (error) => {
    if (error) return res.status(400).send(error);

    const query = req.user.username;

    let image = new Images({
      created_by: query,
      url: req.file.location
    });

    if (req.body.type) { image.type = req.body.type }

    if (req.body.exercise_id) { image.exercise_id = req.body.exercise_id }

    image.save(async (err, image) => {
      if (err) return res.status(400).send(err);

      const response = await saveImageToUser(query, image.url);

      if (response.error) {
        return res.status(400).json({ 'message': response.error });
      } else {
        return res.status(201).json({ 'avatar': image.url });
      }
    });
  });
};

const saveImageToUser = async (username, imageUrl) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) return { error: 'No user found.' };

    user.set({
      avatar: imageUrl
    });

    return user.save();
  }
  catch (e) {
    return { error: e };
  }

};

module.exports = uploadImage;