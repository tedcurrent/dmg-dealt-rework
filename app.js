"use strict";

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

// Routes
const index = require("./server/routes/index");
const api = require("./server/routes/api");

const app = express();

// Rate limiter cfg
const limiter = rateLimit({
	windowMs: 30000,
	max: 100,
	delayAfter: 50,
	delayMs: 1000
});

// View engine setup
app.set("views", path.join(__dirname, "/server/views"));
app.set("view engine", "jade");

// Misc. setup
app.use(compression());
app.use(favicon(path.join(__dirname, "dist/icons", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("files"));
app.use(express.static(path.join(__dirname, "dist"), {maxAge: "1d"}));

// Limiters
app.use("/api/", limiter);

// Route middleware
app.use("/api", api);
app.use("/", index);


// Development error handler
if (app.get("env") === "development") {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// Production error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});

module.exports = app;