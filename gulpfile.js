"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var env = require("gulp-env");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var concat = require("gulp-concat");
var lint = require("gulp-eslint");

var config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/main.js",
		css: "./src/**/*.css",
		images: "./src/images/*",
		dist: "./dist"
	}
};

// Reactify js
gulp.task("js", function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on("error", console.error.bind(console))
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(config.paths.dist + "/scripts"));
});

// Concat all css
gulp.task("css", function() {
	gulp.src(config.paths.css)
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

// Watch files
gulp.task("watch", function() {
	gulp.watch(config.paths.js, ["js", "lint"]);
	gulp.watch(config.paths.css, ["css"]);
});

gulp.task("default", ["css", "js", "lint", "dev", "watch"]);