var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require("fs");
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var s3 = require("gulp-s3");
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var encrypt = require("gulp-simplecrypt").encrypt;
var decrypt = require("gulp-simplecrypt").decrypt;

//**********************************************************************
// PROJECT DIRECTORIES
//**********************************************************************
var project_base_directory = '../locomotive_sites';
var paths = {
  scripts_in: [project_base_directory+'/app/assets/javascripts/**/*.coffee'],
  scripts_out: project_base_directory+'/public/javascripts',
  sass_watch: [project_base_directory+'/app/assets/stylesheets/**/**'],
  sass_in: [project_base_directory+'/app/assets/stylesheets/*.scss'],
  sass_out: project_base_directory+'/public/stylesheets',
  public_assets: [project_base_directory+'/public/**'],
  font_assets: [project_base_directory+'/public/fonts/**']
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
gulp.task('scripts-production', function(){
  return gulp.src(project_base_directory+'/public/javascripts/**/*.js')
    .pipe(order([
      'vendor/*.js',
      'widgets/*.js',
      'BreakpointDetection.js',
      '*.js'
    ]))
    .pipe(concat("production.js"))
    .pipe(uglify())
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
gulp.task('sass-production', function () {
  gulp.src(paths.sass_out+"/*.css")
      .pipe(minifyCSS())
      .pipe(gulp.dest(paths.sass_out+"/production/"))
});

//**********************************************************************
// WATCHERS -- RUNS SCRIPT AND SASS TASKS
//**********************************************************************
gulp.task('watch', function () {
  gulp.watch(paths.scripts_in, ['scripts']);
  gulp.watch(paths.sass_watch, ['sass']);
});

//**********************************************************************
// AWS KEY ENCRYPTION AND DECRYPTION
//**********************************************************************
gulp.task('encrypt-keys', function() {
  encryption_details = JSON.parse(fs.readFileSync('encryption-details.json'));
  gulp.src('keys/*.aws.json')
    .pipe(encrypt({
      password: encryption_details.password,
      salt: encryption_details.salt
    }))
    .pipe(gulp.dest('keys/encrypted/'))
});
gulp.task('decrypt-keys', function() {
  encryption_details = JSON.parse(fs.readFileSync('encryption-details.json'));
  gulp.src('keys/encrypted/*.aws.json')
    .pipe(decrypt({
      password: encryption_details.password,
      salt: encryption_details.salt
    }))
    .pipe(gulp.dest('keys/'))
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
gulp.task('production', ['sass-production', 'scripts-production']);
