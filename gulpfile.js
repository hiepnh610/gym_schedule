'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var watch       = require('gulp-watch');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	return gulp.src('./client/scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sass({ outputStyle: 'expanded' })) // options: compressed, expanded
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./client'));
});

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: './client'
		},
		port: '8000',
		online: true
	});

	gulp.watch("./client/scss/**/*.scss", ['sass']);
	gulp.watch("./client/js/*").on('change',browserSync.reload);
	gulp.watch("./client/*").on('change',browserSync.reload);
});

gulp.task('default', ['serve']);