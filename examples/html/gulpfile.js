/* --- Packages --- */
var requirePackage = function(name) {
	var timerName = `Require ${name}`;
	console.time(timerName);
	var result = require(name);
	console.timeEnd(timerName);
	return result;
};
var gulp = requirePackage('gulp');
var path = require('path');
var stylus = requirePackage('gulp-stylus');
var csso = requirePackage('gulp-csso');
var gutil = requirePackage('gulp-util');
var watch = requirePackage('gulp-watch');
var concat = requirePackage('gulp-concat');
var gulpif = requirePackage('gulp-if');
var uglify = requirePackage('gulp-uglify');
var plumber = requirePackage('gulp-plumber');
var prefix = requirePackage('gulp-autoprefixer');
var iconfont = requirePackage('gulp-iconfont');
var iconfontCss = requirePackage('gulp-iconfont-css');
var postcss = requirePackage('gulp-postcss');
var postcssSize = requirePackage('postcss-size');
var postcssPosition = requirePackage('postcss-position');
var postcssPseudoContent = requirePackage('postcss-pseudo-elements-content');
var webpackStream = requirePackage('webpack-stream');
var webpack = webpackStream.webpack;
var livereload = requirePackage('gulp-livereload');

/* --- Vars --- */
var browsers = ['last 4 version', 'ff > 35', 'chrome > 35', 'ie > 9'];
var isProd = false;
var webpackConfig;

/* --- Default --- */
gulp.task('default', function() {
	return gulp.start('html', 'css', 'js', 'watch', 'livereload');
});

/* --- Prod --- */
gulp.task('prod', function() {
	isProd = true;
	return gulp.start('html', 'css', 'js');
});

/* --- Task / Iconfont --- */
gulp.task('iconfont', function() {
	return gulp
		.src('./source/icons/*.svg')
		.pipe(plumber())
		.pipe(
			iconfontCss({
				fontName: 'iconfontLocal',
				path: './source/css/iconfont-template.styl',
				targetPath: 'iconfont.styl',
				fontPath: '../iconfont/'
			})
		)
		.pipe(
			iconfont({
				fontName: 'iconfontLocal',
				normalize: true,
				fontHeight: 100
			})
		)
		.pipe(gulp.dest('./public/ml_catalog/public/iconfont/'));
});

/* --- Task / CSS --- */
gulp.task('css', ['iconfont'], function() {
	gulp
		.src(['./source/css/style.styl'])
		.pipe(plumber())
		.pipe(stylus())
		.pipe(concat('style.css'))
		.pipe(prefix(browsers))
		.pipe(postcss([postcssPosition, postcssPseudoContent, postcssSize]))
		.pipe(csso())
		.pipe(gulp.dest('./public/ml_catalog/public/css/'))
		.pipe(livereload());
});

/* --- Task / JS libs --- */
var uglifyCondition = function(file) {
	var filename = path.basename(file.path, '.js');
	return isProd && filename.indexOf('.min') < 0;
};
gulp.task('js-libs', function() {
	return gulp
		.src(['./source/js/libs/modernizr.min.js', './source/js/libs/**/*.js'])
		.pipe(plumber())
		.pipe(gulpif(uglifyCondition, uglify()))
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./public/ml_catalog/public/js/'));
});

/* --- Task / JS --- */
var getWebpackConfig = function() {
	var config = {
		output: {
			filename: 'script.js'
		},
		module: {
			loaders: [
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				}
			]
		}
	};
	if (isProd) {
		config.plugins = [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		];
	} else {
		config.plugins = [new webpack.SourceMapDevToolPlugin()];
	}
	return config;
};
gulp.task('js', ['js-libs'], function() {
	if (!webpackConfig) webpackConfig = getWebpackConfig();
	return gulp
		.src('./source/js/script.js')
		.pipe(plumber())
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest('./public/ml_catalog/public/js/'))
		.pipe(livereload());
});

/* --- Task / HTML --- */
gulp.task('html', function() {
	return gulp
		.src(
			[
				'./public/**/*.html',
				'./public/**/*.php',
				'./public/**/*.inc',
				'./includes/**/*.html',
				'./includes/**/*.php',
				'./includes/**/*.inc'
			],
			{ read: false }
		)
		.pipe(livereload());
});

/* --- Task / Watch --- */
gulp.task('watch', function() {
	watch('./source/**/*.styl', function() {
		return gulp.start('css');
	});
	watch('./source/**/*.js', function() {
		return gulp.start('js');
	});
	watch(
		[
			'./public/**/*.html',
			'./public/**/*.php',
			'./public/**/*.inc',
			'./includes/**/*.html',
			'./includes/**/*.php',
			'./includes/**/*.inc'
		],
		function() {
			return gulp.start('html');
		}
	);
	watch('./source/icons/*.svg', function() {
		return gulp.start('iconfont');
	});
});

/* --- Livereload --- */
gulp.task('livereload', function() {
	livereload.listen();
});
