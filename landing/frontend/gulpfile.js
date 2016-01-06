var gulp = require('gulp');
var fs = require('fs-extra');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var minify = typeof gutil.env.minify === 'undefined' || gutil.env.minify === 'true';

function plumber(type) {
  var plumber = require('gulp-plumber');

  return plumber({
    errorHandler: function (error) {
      gutil.log(gutil.colors.red(type + ' error:'), error.message);
      this.emit('end');
  }});
}

gulp.task('stylesheets', function () {
  fs.removeSync('build/stylesheets');

  var postcss    = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  function cssnano() {
    var cssnano = require('gulp-cssnano');

    return cssnano({
      discardComments: { removeAll: true }
    });
  }

  function processors() {
    var ps = [];

    // unify files using @import directive
    ps.push(require('postcss-import'));

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
    .pipe(plumber('Stylesheet'))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors()))
    .pipe(gulpif(minify, cssnano()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('javascripts', function() {
  fs.removeSync('build/javascripts');

  var uglify = require('gulp-uglify');

  require('dotenv').load();

  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var reactify = require('reactify');
  var envify = require('envify');

  function browserify() {
    var browserify = require('browserify');

    return browserify({
      entries: './src/javascripts/app.js',
      transform: [reactify, envify]
    }).bundle();
  }

  return plumber('Javascript')
    .pipe(browserify())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest('./build/javascripts'));
});

gulp.task('images', function() {
  fs.removeSync('build/images');

  var imagemin = require('gulp-imagemin');

  return gulp.src(['src/images/**/*', '!src/images/sprite/', '!src/images/sprite/**'])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, multipass: true }))
    .pipe(gulp.dest('build/images'));
});

gulp.task('html', function() {
  fs.removeSync('build/index.html');
  return gulp.src('src/index.html').pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  fs.removeSync('build/fonts');
  return gulp.src('src/fonts/*').pipe(gulp.dest('build/fonts'));
});

gulp.task('default', ['html', 'images', 'stylesheets', 'javascripts', 'fonts']);

gulp.task('deploy', ['default'], function() {
  var fs = require('fs');
  var s3 = require('gulp-s3');
  var awsCredentials = {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
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

gulp.task('server', ['watch'], function() {
  var server = require('gulp-webserver');

  return gulp.src('build')
    .pipe(server({
      host: '0.0.0.0',
      livereload: true
    }));
});
