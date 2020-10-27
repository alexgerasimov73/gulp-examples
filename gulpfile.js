const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const csso = require('gulp-csso');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
  return src('src/**.html')
    .pipe(fileInclude({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/style/**.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(dest('dist'))
}

function clear() {
  return del('dist')
}

function serve() {
  browserSync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on ('change', browserSync.reload)
  watch('src/style/**.scss', series(scss)).on ('change', browserSync.reload)
}

exports.build = series(clear, scss, html);
exports.serve = series(clear, scss, html, serve);
exports.clear = clear;