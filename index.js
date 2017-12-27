const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const config = require('./config');

const signUp = require('./api/sign_up');

mongoose.connect(config.mongoUri, { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const User = require('./model/user.js');

router.route('/sign_up').post(signUp);

app.use('/api', router);

app.listen(config.PORT, () => {
	console.log(`This app listen on port ${config.PORT}`);
});