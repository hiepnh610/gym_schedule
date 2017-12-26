const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/gym_schedule');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	age: Number,
	gender: String,
	height: Number,
	name: String,
	weight: Number
});

const User = mongoose.model('User', UserSchema);

const router = express.Router();

router.use((req, res, next) => {
	console.log('Something is happening.');
	next();
});

router.get('/', (req, res) => {
	res.json({ message: 'Hello.' });
});

router.route('/sign_up')
.post((req, res) => {
	let user = new User();

	user = req.body;

	// user.age    = req.body.age;
	// user.gender = req.body.gender;
	// user.height = req.body.height;
	// user.name   = req.body.name;
	// user.weight = req.body.weight;

	console.log(user);
	console.log(typeof(user));

	user.save((err) => {
		if(err) res.send(err);

		res.json({ message: 'User created!' });
	});
})
.get((req, res) => {
	User.find((err, user) => {
		if(err) res.send(err);

		res.json(user);
	});
});

router.route('/bears/:bear_id')
.get((req, res) => {
	Bear.findById(req.params.bear_id, (err, bear) => {
		if(err) res.send(err);

		res.json(bear);
	});
})
.put((req, res) => {
	Bear.findById(req.params.bear_id, (err, bear) => {
		if(err) res.send(err);

		bear.name = req.body.name;

		bear.save((err) => {
			if(err) res.send(err);

			res.json({ message: 'Bear updated!' });
		});
	});
})
.delete((req, res) => {
	Bear.remove({
		_id: req.params.bear_id
	}, (err, bear) => {
		if(err) res.send(err);

		res.json({ message: 'Succesfully deleted.' });
	});
});

app.use('/api', router);

app.listen(port, () => {
	console.log(`This app listen on port ${port}`);
});