const express     = require('express');
const cors        = require('cors');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const morgan      = require('morgan');
const path        = require('path');
const history     = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const compression = require('compression');

const config = require('./config');
const router = require('./api');

const clientFolder = path.join(__dirname, '../client/dist');

mongoose.connect(config.mongoUri, {
    keepAlive: true,
    reconnectTries: 30,
    socketTimeoutMS: 0,
    useCreateIndex: true,
    useNewUrlParser: true
});

app.use(compression());
app.use(history({
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.use(serveStatic(clientFolder));

app.listen(config.PORT, () => {
    console.log(`This app listen on port ${config.PORT}`);
});
