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

const verifyToken = require('../auth/verifyToken');

// Login
router
    .route('/login')
    .post(login);

// Sign Up
router
    .route('/sign_up')
    .post(signUp);

// Plans
router
    .route('/list_plans')
    .get(verifyToken, plan.listPlans);

router
    .route('/plans')
    .get(verifyToken, plan.getPlan)
    .post(verifyToken, plan.createPlan);

router
    .route('/plans/:plan_id')
    .put(verifyToken, plan.updatePlan)
    .delete(verifyToken, plan.deletePlan);

// Workout
router
    .route('/list_workout')
    .get(verifyToken, workout.listWorkout);

router
    .route('/workout')
    .get(verifyToken, workout.getWorkout)
    .post(verifyToken, workout.createWorkout);

router
    .route('/workout/:workout_id')
    .put(verifyToken, workout.updateWorkout)
    .delete(verifyToken, workout.deleteWorkout);

// Exercise
router
    .route('/list_exercise')
    .get(verifyToken, exercise.listExercise);

router
    .route('/exercise')
    .get(verifyToken, exercise.getExercise)
    .post(verifyToken, exercise.createExercise);

router
    .route('/exercise/:exercise_id')
    .delete(verifyToken, exercise.deleteExercise);

// Calendar
router
    .route('/exercise/calendar')
    .get(verifyToken, calendar.getAllHistories);

router
    .route('/exercise/calendar_detail')
    .get(verifyToken, calendar.getHistoriesByDate);

router
    .route('/exercise/calendar_detail/:history_id')
    .put(verifyToken, calendar.updateHistory)
    .delete(verifyToken, calendar.deleteHistoryByDate);

// History
router
    .route('/exercise/history')
    .get(verifyToken, exerciseHistories.getExerciseHistory)
    .post(verifyToken, exerciseHistories.createExerciseHistory);

router
    .route('/exercise/track_log/:history_id')
    .put(verifyToken, exerciseHistories.deleteExerciseTrackLog);

router
    .route('/exercise/note/:history_id')
    .put(verifyToken, exerciseHistories.deleteExerciseNote);

// User
router
    .route('/user')
    .get(verifyToken, user.getInfo);

router
    .route('/user/:user_id')
    .put(verifyToken, user.updateInfo);

router
    .route('/modify_password/:user_id')
    .put(verifyToken, user.modifyPassword);

// Upload
router
    .route('/upload')
    .post(verifyToken, uploadImage);

module.exports = router;
