const TEMPLATES_SOURCE = 'source/pages/**/*.pug';
const TEMPLATES_BUILD_PATH = 'public';

const HTML_BUILD_PATH = [
  './public/**/*.html',
  './public/**/*.php',
  './public/**/*.inc',
  './includes/**/*.html',
  './includes/**/*.php',
  './includes/**/*.inc',
];

const COMMON_STYLES_SOURCE = './source/styles/common.styl';
const CSS_BUILD_PATH = './public/assets/css/';
const COMMON_CSS_FILENAME = 'common.css';

const JS_LIBS_SOURCE = './source/scripts/libs/**/*.js';

const CSS_LIBS_SOURCE = './source/styles/libs/*.styl';
const CSS_LIBS_BUILD_PATH = './public/assets/css/';

const JS_BUILD_PATH = './public/assets/js/';
const JS_COMMON_SOURCE = './source/scripts/common.js';
const JS_COMMON_FILENAME = 'common.js';

const TEMPLATES_WATCH = './source/**/*.pug';
const JS_WATCH = './source/**/*.js';
const VUE_WATCH = './source/**/*.vue';
const STYLES_WATCH = './source/**/*.styl';

const DATA_SOURCE_PATH = 'source/blocks/**/*.json';
const DATA_OUTPUT_PATH = 'tmp';
const DATA_FILENAME = 'db.json';

module.exports = {
  COMMON_CSS_FILENAME,
  COMMON_STYLES_SOURCE,
  CSS_BUILD_PATH,
  CSS_LIBS_BUILD_PATH,
  CSS_LIBS_SOURCE,
  DATA_FILENAME,
  DATA_OUTPUT_PATH,
  DATA_SOURCE_PATH,
  HTML_BUILD_PATH,
  JS_BUILD_PATH,
  JS_COMMON_FILENAME,
  JS_COMMON_SOURCE,
  JS_LIBS_SOURCE,
  JS_WATCH,
  STYLES_WATCH,
  TEMPLATES_BUILD_PATH,
  TEMPLATES_SOURCE,
  TEMPLATES_WATCH,
  VUE_WATCH,
};
