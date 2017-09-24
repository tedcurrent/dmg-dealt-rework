"use strict";

import gulp from "gulp";
import nodemon from "gulp-nodemon";
import env from "gulp-env";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import lint from "gulp-eslint";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import sass from "gulp-sass";
import tape from "gulp-tape";
import tapDiff from "tap-diff";
import champDataUtil from "./server/utils/champDataUtil";

const config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/main.js",
		sass: "./src/stylesheets/main.scss",
		styles: ["./src/stylesheets/**/*.css", "./src/stylesheets/**/*.scss"],
		images: "./src/assets/images/*",
		icons: "./src/assets/icons/*",
		static: "./server/static",
		test: ["./test/client/**/*.js", "./test/server/**/*.js"],
		testItgr: "./test/data/**/*.js",
		dist: "./dist"
	}
};

// Reactify js
gulp.task("js", () => {
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
gulp.task("styles", () => {
	gulp.src(config.paths.sass)
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(concat("bundle.css"))
		.pipe(gulp.dest(config.paths.dist + "/css"));
});

// Move all assets
gulp.task("assets", () => {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"));

	gulp.src(config.paths.icons)
		.pipe(gulp.dest(config.paths.dist + "/icons"));
});

// Start nodemon
gulp.task("dev", () => {
	env({imports: {"NODE_ENV": "development"}});
	nodemon({
		script: "./bin/www",
		ext: "js jade css",
		env: {
			PORT: 3001
		}
	})
	.on("restart", () => {
		console.log("Server restarted!");
	});
});

// Lint
gulp.task("lint", () => {
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
});

// Write static data
gulp.task("static", () => {
	champDataUtil.writeChampsToPath(config.paths.static + "/championData.json");
});

// Test
gulp.task("test", () => {
	return gulp.src(config.paths.test)
		.pipe(tape({
			reporter: tapDiff()
		}));
});

// Integration tests
gulp.task("test-integration", () => {
	return gulp.src(config.paths.testItgr)
		.pipe(tape({
			reporter: tapDiff()
		}));
});

// Watch files
gulp.task("watch", () => {
	gulp.watch(config.paths.js, ["js", "lint"]);
	gulp.watch(config.paths.styles, ["styles"]);
});

// Apply production environment
gulp.task("apply-production", () => {
	return process.env.NODE_ENV = "production";
});

// Apply development environment
gulp.task("apply-development", () => {
	return process.env.NODE_ENV = "development";
});

gulp.task("default", ["apply-development", "static", "styles", "assets", "js", "lint", "dev", "watch"]);
gulp.task("production", ["apply-production", "static", "styles", "assets", "js"]);