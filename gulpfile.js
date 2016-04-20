"use strict";

const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = webpackStream.webpack;
const named = require("vinyl-named");
const plumber = require("gulp-plumber");
const eslint = require("gulp-eslint");
const path = require("path");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const notify = require("gulp-notify");

gulp.task('default', function () {
	let options = {
		watch: true,
		devtools: null,
		module: {
			test: /\.js$/,
			include: path.join(__dirname, "src"),
			loader: "babel"
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		]
	};

	return gulp.src("src/idb.js")
	            .pipe(plumber({
	            	errorHandler: notify.onError(err => ({
	            		title: "Webpack",
	            		message: err.message
	            	}))
	            }))
	            .pipe(eslint())
	            .pipe(eslint.format())
	            .pipe(named())
	            .pipe(webpackStream(options))
	            .pipe(gulp.dest("dist"))
});