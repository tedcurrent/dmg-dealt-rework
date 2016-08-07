"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import APIRequests from "../requests/APIRequests";
import { apiActionConstants } from "../constants/ActionConstants";

class ApiRequestActions {
	getSummoner(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		APIRequests.getSummoner(query);
	}

	getPersonalGames(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getPersonalGames(query);
	}

	getRegionalGames() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getRegionalGames();
	}

	cleanUpGames() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_CLEAN_UP
		});
	}
}

export default new ApiRequestActions();