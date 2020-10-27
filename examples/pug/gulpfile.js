const gulp = require('gulp');
const dev= require('./tools/gulp/tasks/dev');
const build = require('./tools/gulp/tasks/build');

gulp.task('dev', dev);
gulp.task('prod', build);
gulp.task('default', dev);
