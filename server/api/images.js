const Images = require('../model/images');

const getAllImages = (req, res) => {
    if (req.query.username) {
        const query = { 'created_by': req.query.username };

        Images
        .find(query)
        .sort({'created_at': 'desc'})
        .exec((err, images) => {
            if (err) return res.status(400).send(err);

            const profileImages = images.map(item => {
                return {
                    url: item.url
                }
            })

            res.status(200).json(profileImages);
        });
    }
};

const getProfileImages = (req, res) => {
    if (req.query.username) {
        const query = {
            'created_by': req.query.username,
            'type': 'profile'
        };

        Images
        .find(query)
        .sort({'created_at': 'desc'})
        .exec((err, images) => {
            if (err) return res.status(400).send(err);

            const profileImages = images.map(item => {
                return {
                    url: item.url
                }
            })

            res.status(200).json(profileImages);
        });
    }
};

module.exports = {
    getAllImages,
    getProfileImages
};
