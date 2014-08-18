var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var fs = require("fs");
var coffee = require('gulp-coffee');
var sass = require('gulp-ruby-sass');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var s3 = require("gulp-s3");

var paths = {
  scripts: ['../locomotive_sites/app/assets/javascripts/*.coffee'],
  compass: '../locomotive_sites/app/assets/stylesheets/**/*.scss'
};

//*
// COFFEE -> JavaScript
//*
gulp.task('scripts', function(){

  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest('../locomotive_sites/public/javascripts'));
});

//*
// SASS -> CSS
//*
gulp.task('sass', function () {
  gulp.src('../locomotive_sites/app/assets/stylesheets/*.scss')
      .pipe(sass({sourcemap: true}))
      .pipe(gulp.dest('../locomotive_sites/public/stylesheets'))
});

//*
// WATCHER -- RUNS SCRIPT AND SASS TASKS
//
//*
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.compass, ['compass']);
});

//*
// FONT ICON UPLOAD
// Upload font icons to S3.  You need to specify IAM keys.
//*
gulp.task('fonticontos3', function() {

  // UPDATE IAM KEYS - create 'keys' folder
  aws = JSON.parse(fs.readFileSync('./keys/updateme.aws.json'));

  // The delay needs to be kept, otherwise the transfer fails.
  options = { delay: 1000 }

  gulp.src('../locomotive_sites/public/fonts/**', {read: false})
      .pipe(s3(aws, options));

});

gulp.task('default', ['watch']);
gulp.task('font_upload', ['fonticontos3']);
