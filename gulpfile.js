"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var env = require("gulp-env");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var lint = require("gulp-eslint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var sass = require("gulp-sass");
var tape = require("gulp-tape");
var tapDiff = require("tap-diff");
var champDataUtil = require("./server/utils/champDataUtil");

var config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/main.js",
		sass: "./src/stylesheets/main.scss",
		styles: ["./src/stylesheets/**/*.css", "./src/stylesheets/**/*.scss"],
		images: "./src/images/*",
		static: "./server/static",
		test: "./test/**/*.js",
		dist: "./dist"
	}
};

// Reactify js
gulp.task("js", function() {
	browserify(config.paths.mainJs)
		.transform("babelify", {presets: ["react"]})
		.bundle()
		.on("error", console.error.bind(console))
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + "/scripts"));
});

// Concat all css
gulp.task("styles", function() {
	gulp.src(config.paths.sass)
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(concat("bundle.css"))
		.pipe(gulp.dest(config.paths.dist + "/css"));
});

// Start nodemon
gulp.task("dev", function() {
	env({vars: {"NODE_ENV": "development"}});
	nodemon({
		script: "./bin/www",
		ext: "js jade css",
		env: {
			PORT: 3001
		}
	})
	.on("restart", function() {
		console.log("Server restarted!");
	});
});

// Lint
gulp.task("lint", function() {
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
});

// Write static data
gulp.task("static", function() {
	champDataUtil.writeChampsToPath(config.paths.static + "/championData.json");
});

// Test
gulp.task("test", function() {
	return gulp.src(config.paths.test)
		.pipe(tape({
			reporter: tapDiff()
		}));
});

// Watch files
gulp.task("watch", function() {
	gulp.watch(config.paths.js, ["js", "lint"]);
	gulp.watch(config.paths.styles, ["styles"]);
});

gulp.task("default", ["static", "styles", "js", "lint", "dev", "watch"]);