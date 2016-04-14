"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var BrowserHistory = ReactRouter.browserHistory;
var routes = require("./js/routes/routes");
var Test = require("./js/components/test");

ReactDOM.render(
	<Router history={BrowserHistory} routes={routes} />,
	document.getElementById("app")
);