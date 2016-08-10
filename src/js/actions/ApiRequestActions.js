"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import APIRequests from "../requests/APIRequests";
import { apiActionConstants } from "../constants/ActionConstants";

class ApiRequestActions {
	static getSummoner(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		APIRequests.getSummoner(query);
	}

	static getPersonalGames(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getPersonalGames(query);
	}

	static getRegionalGames() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getRegionalGames();
	}

	static cleanUpGames() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_CLEAN_UP
		});
	}
}

export default ApiRequestActions;