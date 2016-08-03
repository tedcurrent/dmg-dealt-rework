"use strict";

import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../components/App/";
import Splash from "../components/Splash/";
import Personal from "../components/PersonalGames/";
import Regions from "../components/RegionalGames/";
import NotFound from "../components/404/";

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Splash} />
		<Route path="/:id/:region" component={Personal} />
		<Route path="/regions" component={Regions} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;