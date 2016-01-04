var gulp = require('gulp');
var fs = require('fs-extra');

gulp.task('stylesheets', function () {
  fs.removeSync('build/stylesheets');

  var postcss    = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var processors = [
    require('postcss-import'),
    //require('cssnano'),
    require('postcss-sprites')({
      stylesheetPath: './build/stylesheets',
      spritePath    : './build/images/sprite.png',
      retina        : true,
      filterBy      : function(img) { return /images\/sprite/.test(img.url) }
    }),
    require('precss'),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ];

  return gulp.src('src/stylesheets/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('javascripts', function() {
  fs.removeSync('build/javascripts');

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

gulp.task('watch', ['default'], function() {
  gulp.watch('src/stylesheets/**/*.css', ['stylesheets']);
  gulp.watch('src/javascripts/**/*.js', ['javascripts']);
  gulp.watch('src/images/**/*.css', ['images']);
  gulp.watch('src/index.html', ['html']);
});
