const express = require('express');
const router  = express.Router();

const plan         = require('./plan');
const user         = require('./user');
const profile      = require('./profile');
const login        = require('./login');
const images       = require('./images');
const signUp       = require('./signUp');
const follow       = require('./follow');
const workout      = require('./workout');
const comment      = require('./comments');
const newsFeed     = require('./news-feed');
const uploadImage  = require('./upload');
const exercise     = require('./exercise');
const activities   = require('./activities');
const likeActivity = require('./like');
const verifyEmail  = require('./email');
const resendMail   = require('./resendMail');
const verifyToken  = require('../auth/verifyToken');

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
    .route('/user')
    .put(verifyToken, user.updateInfo);

router
    .route('/modify_password/:user_id')
    .put(verifyToken, user.modifyPassword);

// Send mail forgot password
router
    .route('/forgot-password')
    .post(user.forgotPassword);

// Reset Password
router
    .route('/reset-password')
    .put(user.resetPassword);

// Upload
router
    .route('/upload')
    .post(verifyToken, uploadImage);

// Profile
router
    .route('/profile')
    .get(verifyToken, profile.getInfo);

router
    .route('/profile_activities')
    .get(verifyToken, profile.profileActivities);

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

// Like activity
router
    .route('/like')
    .post(verifyToken, likeActivity);

// Comment activity
router
    .route('/comment')
    .post(verifyToken, comment.createComment);

router
    .route('/comment/:comment_id')
    .put(verifyToken, comment.updateComment)
    .delete(verifyToken, comment.deleteComment);

// Verify Email
router
    .route('/email-verification')
    .put(verifyEmail);

// Resend Verification Mail
router
    .route('/resend-verification-mail')
    .post(resendMail.resendVerificationMail);

// Images
router
    .route('/images')
    .get(verifyToken, images.getAllImages);

router
    .route('/profile-images')
    .get(verifyToken, images.getProfileImages);

// Follow
router
    .route('/follow/:username')
    .put(verifyToken, follow.followUser);

router
    .route('/un-follow/:username')
    .put(verifyToken, follow.unFollowUser);

router
    .route('/list-follower')
    .get(verifyToken, follow.getInfoFollower);

// News Feed
router
    .route('/news-feed')
    .get(verifyToken, newsFeed.newsFeed);

module.exports = router;
