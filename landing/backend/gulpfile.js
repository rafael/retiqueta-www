var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var install = require('gulp-install');
var zip = require('gulp-zip');
var AWS = require('aws-sdk');
var fs = require('fs-extra');
var runSequence = require('run-sequence');

gulp.task('clean', function(cb) {
  fs.remove('build', cb);
});

gulp.task('js', function() {
  return gulp.src('subscribeMember.js').pipe(gulp.dest('build'))
});

// Here we want to install npm packages to build, ignoring devDependencies.
gulp.task('npm', function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('build'))
    .pipe(install({production: true}));
});

// Next copy over environment variables managed outside of source control.
gulp.task('env', function() {
  return gulp.src('env.production')
    .pipe(rename('.env'))
    .pipe(gulp.dest('build'))
});

gulp.task('zip', function() {
  return gulp.src(['build/**/*', '!build/package.json', 'build/.*'])
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('upload', function() {
  require('dotenv').load();

  AWS.config.region = process.env.AWS_REGION;
  var lambda = new AWS.Lambda();
  var functionName = process.env.LAMBDA_FUNCTION_NAME;
  var handler = process.env.LAMBDA_FUNCTION_HANDLER;
  var role = process.env.LAMBDA_FUNCTION_ROLE;
  var zipFile = fs.readFileSync('build.zip');
  Func.save(lambda, functionName, handler, role, zipFile);
})

// The key to deploying as a single command is to manage the sequence of events.
gulp.task('default', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'npm', 'env'],
    ['zip'],
    ['upload'],
    callback
  );
});



Func = {
  _logError: function(err) {
    gutil.log(err.code + ': ' + err.message);
  },

  save: function(lambda, functionName, handler, role, zipFile) {
    var params = { FunctionName: functionName };

    lambda.getFunction(params, function(err, data) {
      if (err) {
        if (err.statusCode === 404) {
          this.create(lambda, functionName, handler, role, zipFile);
        } else {
          this._logError(err);
        }
      } else {
        this.update(lambda, functionName, handler, role, zipFile);
      }
    }.bind(this));
  },

  updateConfig: function(lambda, functionName, handler, role, cb) {
    gutil.log('Updating configuration for function: ' + functionName);

    var params = {
      FunctionName: functionName, /* required */
      // Description: 'STRING_VALUE',
      Handler: handler,
      // MemorySize: 0,
      Role: role
      // Timeout: 0
    }

    lambda.updateFunctionConfiguration(params, function(err, data) {
      if (err) this._logError(err);
      else cb();
    }.bind(this));
  },

  updateCode: function(lambda, functionName, zipFile) {
    var params = {
      FunctionName: functionName,
      //Publish: true || false,
      ZipFile: zipFile
    };

    gutil.log('Updating code for function: ' + functionName);

    lambda.updateFunctionCode(params, function(err, data) {
      if (err) {
        this._logError(err);
      } else {
        gutil.log('Function code updated successfully');
      }
    }.bind(this));
  },

  update: function(lambda, functionName, handler, role, zipFile) {
    var cb = function() { this.updateCode(lambda, functionName, zipFile) }.bind(this);
    this.updateConfig(lambda, functionName, handler, role, cb);
  },

  create: function(lambda, functionName, handler, role, zipFile) {
    var params = {
      Code: { ZipFile: zipFile },
      FunctionName: functionName, /* required */
      Handler: handler, /* required */
      Role: role, /* required */
      Runtime: 'nodejs', /* required */
      //Description: 'STRING_VALUE',
      //MemorySize: 0,
      //Publish: true || false,
      //Timeout: 0
    };

    gutil.log('Creating function: ' + functionName);

    lambda.createFunction(params, function(err, data) {
      if (err) {
        this._logError(err);
      } else {
        gutil.log("Function created successfully");
      }
    }.bind(this));
  }
}
