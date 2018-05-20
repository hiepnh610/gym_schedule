const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('avatar');

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(201).send(req.file);
    })
}

module.exports = uploadImage;
