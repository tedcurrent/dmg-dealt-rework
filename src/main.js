"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var BrowserHistory = ReactRouter.browserHistory;
import routes from "./js/routes/routes";

ReactDOM.render(
	<Router history={BrowserHistory} routes={routes} />,
	document.getElementById("app")
);