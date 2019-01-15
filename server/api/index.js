const express = require('express');
const router  = express.Router();

const plan        = require('./plan');
const user        = require('./user');
const profile     = require('./profile');
const login       = require('./login');
const signUp      = require('./sign_up');
const workout     = require('./workout');
const uploadImage = require('./upload');
const exercise    = require('./exercise');
const activities    = require('./activities');

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
    .get(verifyToken, workout.mergeExerciseIntoWorkout)
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

// Profile
router
    .route('/profile')
    .get(verifyToken, profile);

// Activities
router
    .route('/activities')
    .get(verifyToken, activities.getAllActivities)
    .post(verifyToken, activities.createActivity);

router
    .route('/activities/:activity_id')
    .delete(verifyToken, activities.deleteActivity);

router
    .route('/activity_detail')
    .get(verifyToken, activities.getActivitiesByDate);

module.exports = router;
