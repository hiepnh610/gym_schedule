const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');

const config = require('./config');

const signUp = require('./api/sign_up');
const plan = require('./api/plan');
const workoutDay = require('./api/workout_day');

mongoose.connect(config.mongoUri, { useMongoClient: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.route('/sign_up').post(signUp);

router.route('/plans').get(plan.getPlan).post(plan.createPlan);
router.route('/plans/:plan_id').put(plan.updatePlan).delete(plan.deletePlan);

router.route('/workout_day').get(workoutDay.getWorkoutDay).post(workoutDay.createWorkoutDay);
router.route('/workout_day/:workout_day_id').put(workoutDay.updateWorkoutDay).delete(workoutDay.deleteWorkoutDay);

app.use('/api', router);

app.listen(config.PORT, () => {
	console.log(`This app listen on port ${config.PORT}`);
});