(function () {
  'use strict';

  var gulp = require('gulp');
  var babel = require('gulp-babel');
  var browserify = require('browserify');
  var connect = require('gulp-connect');
  var rt = require('gulp-react-templates');

  gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
  });

  gulp.task('rt', function() {
    return gulp.src('app/js/**/*.rt')
      .pipe(rt({modules: 'none'}))
      .pipe(babel())
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
  });

  gulp.task('html', function () {
    return gulp.src(['app/index.html'])
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

  gulp.task('bower', function () {
    return gulp.src(['app/bower_components/**/*'])
      .pipe(gulp.dest('dist/bower_components'));
  });

  gulp.task('connect', function () {
    return connect.server({
      root: 'dist',
      port: 8080,
      livereload: true
    });
  });

  gulp.task('watch', function () {
    gulp.watch(['app/index.html'], ['html']);
    gulp.watch(['app/js/**/*.js'], ['js']);
    gulp.watch(['app/js/**/*.rt'], ['rt']);
  });

  gulp.task('default', ['bower', 'js', 'html', 'rt', 'connect', 'watch']);
})();