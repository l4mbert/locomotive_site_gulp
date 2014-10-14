var gulp = require('gulp');
var gutil = require('gulp-util');
// var concat = require('gulp-concat'); // Production task needs to be created
var fs = require("fs");
var coffee = require('gulp-coffee');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var s3 = require("gulp-s3");
var prefix = require('gulp-autoprefixer');

//**********************************************************************
// PROJECT DIRECTORIES
//**********************************************************************
var paths = {
  scripts_in: ['../locomotive_sites/app/assets/javascripts/*.coffee'],
  scripts_out: '../locomotive_sites/public/javascripts',
  sass_watch: ['../locomotive_sites/app/assets/stylesheets/**/**'],
  sass_in: ['../locomotive_sites/app/assets/stylesheets/*.scss'],
  sass_out: '../locomotive_sites/public/stylesheets',
  public_assets: ['../locomotive_sites/public/**'],
  font_assets: ['../locomotive_sites/public/fonts/**']
};

//**********************************************************************
// COFFEE -> JAVASCRIPT
//**********************************************************************
gulp.task('scripts', function(){

  return gulp.src(paths.scripts_in)
    .pipe(plumber())
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest(paths.scripts_out));
});

//**********************************************************************
// SASS -> CSS
//**********************************************************************
gulp.task('sass', function () {
  gulp.src(paths.sass_in)
      .pipe(sass({sourcemap: false}))
      .pipe(prefix())
      .pipe(gulp.dest(paths.sass_out))
});

//**********************************************************************
// WATCHERS -- RUNS SCRIPT AND SASS TASKS
//**********************************************************************
gulp.task('watch', function () {
  gulp.watch(paths.scripts_in, ['scripts']);
  gulp.watch(paths.sass_watch, ['sass']);
});

//**********************************************************************
// FONT ICON UPLOAD
// Upload font icons to S3.  You need to specify IAM keys.
//**********************************************************************
gulp.task('fonts-to-s3', function() {

  // UPDATE IAM KEYS - create 'keys' folder
  aws = JSON.parse(fs.readFileSync('./keys/xxx.aws.json'));

  options = {
    delay: 1000, // The delay needs to be kept, otherwise the transfer fails
    uploadPath: '/fonts/'
  }

  gulp.src(paths.font_assets, {read: false})
      .pipe(s3(aws, options));

});

//**********************************************************************
// S3 - MOVE ALL PUBLIC ASSETS TO S3
// You need to specify IAM keys.
//**********************************************************************
gulp.task('assets-to-s3', function() {

  aws = JSON.parse(fs.readFileSync('./keys/xxx.aws.json'));

  options = { delay: 1000 } // The delay needs to be kept, otherwise the transfer fails.

  gulp.src(paths.public_assets, {read: false})
      .pipe(s3(aws, options));

});


gulp.task('default', ['watch']);
