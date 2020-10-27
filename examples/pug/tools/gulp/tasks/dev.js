const gulp = require('gulp');
const build = require('./build');
const watch = require('./watch');

module.exports = gulp.series(build, watch);
