"use strict";

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var rateLimit = require("express-rate-limit");

// routes
var index = require("./server/routes/index");
var api = require("./server/routes/api");

var app = express();

// rate limiter cfg
var limiter = rateLimit({
	windowMs: 30000,
	max: 100,
	delayAfter: 50,
	delayMs: 1000
});

// view engine setup
app.set("views", path.join(__dirname, "/server/views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(__dirname, "dist/icons", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

// limiters
app.use("/api/", limiter);

// route middleware
app.use("/api", api);
app.use("/", index);

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});


module.exports = app;
