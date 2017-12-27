const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const signUp     = require('./api/sign_up');

mongoose.connect('mongodb://localhost/gym_schedule', { useMongoClient: true });

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const User = require('./model/user.js');

router.route('/sign_up').post(signUp);

app.use('/api', router);

app.listen(port, () => {
	console.log(`This app listen on port ${port}`);
});