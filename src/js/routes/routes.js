"use strict";

var React = require("react");
var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var App = require("../app");
var Splash = require("../components/Splash/");
var Regions = require("../components/RegionalGames/");
var NotFound = require("../404");

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Splash} />
		<Route path="/regions" component={Regions} />
		<Route path="*" component={NotFound} />
	</Route>
);

module.exports = routes;