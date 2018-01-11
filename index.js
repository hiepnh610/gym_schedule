const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');

const config = require('./config');
const router = require('./api');

mongoose.connect(config.mongoUri, { useMongoClient: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(config.PORT, () => {
	console.log(`This app listen on port ${config.PORT}`);
});