var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var rt = require('gulp-react-templates');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');

var paths = {
  scripts: 'app/js/**/*.js',
  ractTemplates: 'app/js/**/*.rt',
  htmls: ['app/index.html']
};

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('clean-bower', function() {
  return del(['app/bower_components']);
});

gulp.task('js', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('rt', function() {
  return gulp.src(paths.ractTemplates)
    .pipe(sourcemaps.init())
    .pipe(rt({modules: 'none'}))
    .pipe(sourcemaps.write())
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
  gulp.watch(paths.ractTemplates, ['rt']);
});

gulp.task('build', ['bower', 'js', 'html', 'rt']);
gulp.task('dist', function (callback) {
  runSequence('clean', 'build', callback);
});
gulp.task('server', ['build', 'connect', 'watch']);
gulp.task('default', ['server']);
