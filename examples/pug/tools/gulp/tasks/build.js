const gulp = require('gulp');
const dataTask = require('./data');
const pugTask = require('./pug');
const cssTask = require('./css');
const javascriptTask = require('./javascript');
const jsLibsTask = require('./js-libs');
const cssLibsTask = require('./css-libs');

module.exports = gulp.series(dataTask, pugTask, cssTask, cssLibsTask, jsLibsTask, javascriptTask);
