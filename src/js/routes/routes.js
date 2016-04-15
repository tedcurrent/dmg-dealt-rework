"use strict";

var React = require("react");
var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var App = require("../app");
var Main = require("../components/Main/index");
var NotFound = require("../404");

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Main} />
		<Route path="*" component={NotFound} />
	</Route>
);

module.exports = routes;