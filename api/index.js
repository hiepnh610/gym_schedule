const express = require('express');
const router  = express.Router();

const signUp     = require('./sign_up');
const plan       = require('./plan');
const workoutDay = require('./workout_day');

router.route('/sign_up').post(signUp);

router.route('/plans').get(plan.getPlan).post(plan.createPlan);
router.route('/plans/:plan_id').put(plan.updatePlan).delete(plan.deletePlan);

router.route('/workout_day').get(workoutDay.getWorkoutDay).post(workoutDay.createWorkoutDay);
router.route('/workout_day/:workout_day_id').put(workoutDay.updateWorkoutDay).delete(workoutDay.deleteWorkoutDay);

module.exports = router;
