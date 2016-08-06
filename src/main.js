"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./js/routes/routes";

ReactDOM.render(
	<Router history={browserHistory} routes={routes} />,
	document.getElementById("app")
);