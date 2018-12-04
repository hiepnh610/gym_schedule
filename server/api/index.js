const express = require('express');
const router  = express.Router();

const plan        = require('./plan');
const user        = require('./user');
const login       = require('./login');
const signUp      = require('./sign_up');
const workout     = require('./workout');
const uploadImage = require('./upload');
const calendar    = require('./calendar');

const exercise    = require('./exercise');
const exerciseHistories = require('./exercise_histories');

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
router.route('/exercise/:exercise_id').delete(exercise.deleteExercise);

router.route('/exercise/calendar').get(calendar.getAllHistories);
router.route('/exercise/calendar_detail').get(calendar.getHistoriesByDate);
router.route('/exercise/calendar_detail/:history_id').put(calendar.updateHistory).delete(calendar.deleteHistoryByDate);

router.route('/exercise/history').get(exerciseHistories.getExerciseHistory).post(exerciseHistories.createExerciseHistory);
router.route('/exercise/track_log/:history_id').put(exerciseHistories.deleteExerciseTrackLog);
router.route('/exercise/note/:history_id').put(exerciseHistories.deleteExerciseNote);

router.route('/user').get(user.getInfo);
router.route('/user/:user_id').put(user.updateInfo);

router.route('/modify_password/:user_id').put(user.modifyPassword);

router.route('/upload').post(uploadImage);

module.exports = router;
