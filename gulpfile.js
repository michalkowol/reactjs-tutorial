var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var del = require('del');
var runSequence = require('run-sequence');
var rt = require('react-templatify');

var paths = {
  scripts: 'app/js/**/*.js',
  reactTemplates: 'app/js/**/*.rt',
  htmls: ['app/index.html']
};

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('clean-bower', function() {
  return del(['app/bower_components']);
});

gulp.task('js', function () {
  return browserify({entries: './app/js/app.js', debug: true, transform: [babelify, rt]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src(paths.htmls)
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('bower', function () {
  return gulp.src('app/bower_components/**/*')
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
  gulp.watch(paths.htmls, ['html']);
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.reactTemplates, ['js']);
});

gulp.task('build', ['bower', 'js', 'html']);
gulp.task('dist', function (callback) {
  runSequence('clean-dist', 'build', 'clean-bower', callback);
});
gulp.task('server', ['build', 'connect', 'watch']);
gulp.task('default', ['server']);
