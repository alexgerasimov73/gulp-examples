const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');

const webpackConfig = require('../../webpack/webpack.config');

const { JS_COMMON_SOURCE, JS_BUILD_PATH } = require('../../constants');

module.exports = function() {
  console.log(
    '\x1b[36m%s\x1b[0m',
    ` — Task: javascript | Основной бандл\n${JS_COMMON_SOURCE} -> ${JS_BUILD_PATH}`,
  );

  return gulp
    .src(JS_COMMON_SOURCE)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(JS_BUILD_PATH))
    .pipe(livereload());
};
