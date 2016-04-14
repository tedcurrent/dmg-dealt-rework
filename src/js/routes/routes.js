"use strict";

var React = require("react");
var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var App = require("../app");
var MainPage = require("../components/test");
var NotFound = require("../404");

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={MainPage} />
		<Route path="*" component={NotFound} />
	</Route>
);

module.exports = routes;