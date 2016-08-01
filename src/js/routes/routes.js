"use strict";

var React = require("react");
var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var App = require("../components/App/");
var Splash = require("../components/Splash/");
var Personal = require("../components/PersonalGames/");
var Regions = require("../components/RegionalGames/");
import NotFound from "../components/404/";

// All possible routes listed here
var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Splash} />
		<Route path="/:id/:region" component={Personal} />
		<Route path="/regions" component={Regions} />
		<Route path="*" component={NotFound} />
	</Route>
);

module.exports = routes;