const Activity = require('../model/activities');

const likeActivity = (req, res) => {
    if (req.user._id && req.query.activityId) {
        const query = { _id: req.query.activityId };

        Activity.findOne(query, (err, activity) => {
            if (err) return res.status(400).send(err);

            if (!activity) return res.status(400).json({ message: 'No activity found.' });

            const indexOfId = activity.likes.indexOf(req.user._id);

            if (indexOfId > -1) {
                activity.likes.splice(indexOfId, 1);
            } else {
                activity.likes.push(req.user._id);
            }

            activity.save((err) => {
                if (err) return res.status(400).send(err);
            });

            return res.status(200).json({ message: 'Successfully' });
        });
    }
};

module.exports = likeActivity;
