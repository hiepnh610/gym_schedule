const express = require('express');
const router  = express.Router();

const plan        = require('./plan');
const user        = require('./user');
const login       = require('./login');
const signUp      = require('./sign_up');
const workout     = require('./workout');
const exercise    = require('./exercise');
const uploadImage = require('./upload');

router.route('/login').post(login);
router.route('/sign_up').post(signUp);

router.route('/list_plans').get(plan.listPlans);
router.route('/plans').get(plan.getPlan).post(plan.createPlan);
router.route('/plans/:plan_id').put(plan.updatePlan).delete(plan.deletePlan);

router.route('/list_workout').get(workout.listWorkout);
router.route('/workout').get(workout.getWorkout).post(workout.createWorkout);
router.route('/workout/:workout_id').put(workout.updateWorkout).delete(workout.deleteWorkout);

router.route('/list_exercise').get(exercise.listExercise);
router.route('/exercise').get(exercise.getExercise).post(exercise.createExercise);
router.route('/exercise/:exercise_id').put(exercise.updateExercise).delete(exercise.deleteExercise);

router.route('/user').get(user.getInfo);
router.route('/user/:user_id').put(user.updateInfo);

router.route('/modify_password/:user_id').put(user.modifyPassword);

router.route('/upload').post(uploadImage);

module.exports = router;
