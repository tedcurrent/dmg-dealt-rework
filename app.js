"use strict";

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var rateLimit = require("express-rate-limit");

// Routes
var index = require("./server/routes/index");
var api = require("./server/routes/api");

var app = express();

// Rate limiter cfg
var limiter = rateLimit({
	windowMs: 30000,
	max: 100,
	delayAfter: 50,
	delayMs: 1000
});

// View engine setup
app.set("views", path.join(__dirname, "/server/views"));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "dist/icons", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

// Limiters
app.use("/api/", limiter);

// Route middleware
app.use("/api", api);
app.use("/", index);


// Development error handler
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// Production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});


module.exports = app;
