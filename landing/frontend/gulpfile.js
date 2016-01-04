var gulp = require('gulp');
var fs = require('fs-extra');
var gutil = require('gulp-util');
var minify = typeof gutil.env.minify === 'undefined' || gutil.env.minify === 'true';

gulp.task('stylesheets', function () {
  fs.removeSync('build/stylesheets');

  var postcss    = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  function processors() {
    var ps = [];

    // unify files using @import directive
    ps.push(require('postcss-import'));

    // minify css
    if(minify) {
      ps.push(require('cssnano'));
    }

    // sprite generation
    ps.push(require('postcss-sprites')({
      stylesheetPath: './build/stylesheets',
      spritePath    : './build/images/sprite.png',
      retina        : true,
      filterBy      : function(img) { return /images\/sprite/.test(img.url) }
    }));

    // use sass syntax
    ps.push(require('precss'));

    // prefix css properties for crossbrowser support
    ps.push(require('autoprefixer')({ browsers: ['last 2 versions'] }));

    return ps;
  }

  return gulp.src('src/stylesheets/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('javascripts', function() {
  fs.removeSync('build/javascripts');

  var gulpif = require('gulp-if');
  var uglify = require('gulp-uglify');

  require('dotenv').load();

  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var reactify = require('reactify');
  var envify = require('envify');

  return browserify({
      entries: './src/javascripts/app.js',
      transform: [reactify, envify]
    }).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest('./build/javascripts'));
});

gulp.task('images', function() {
  fs.removeSync('build/images');
  return gulp.src(['src/images/**/*', '!src/images/sprite/', '!src/images/sprite/**'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('html', function() {
  fs.removeSync('build/index.html');
  return gulp.src('src/index.html').pipe(gulp.dest('build'));
});

gulp.task('default', ['html', 'images', 'stylesheets', 'javascripts']);

gulp.task('deploy', ['default'], function() {
  var fs = require('fs');
  var s3 = require('gulp-s3');
  var awsCredentials = {
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION
  };

  return gulp.src('build/**')
    .pipe(s3(awsCredentials, {
      uploadPath: '/',
      headers: {
        'x-amz-acl': 'public-read'
      }
    }));
});

gulp.task('watch', ['default'], function() {
  gulp.watch('src/stylesheets/**/*.css', ['stylesheets']);
  gulp.watch('src/javascripts/**/*.js', ['javascripts']);
  gulp.watch('src/images/**/*.css', ['images']);
  gulp.watch('src/index.html', ['html']);
});
