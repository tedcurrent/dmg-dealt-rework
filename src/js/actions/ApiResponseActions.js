"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { searchActionConstants, apiActionConstants } from "../constants/ActionConstants";

class ApiResponseActions {
	static updateSummonerSearchResult(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.SUMMONER_FOUND,
			data: result
		});
	}

	static summonerSearchError(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.ERROR,
			data: result
		});
	}

	static updatePersonalGames(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_FOUND,
			data: result
		});
	}

	static gameSearchError(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_SEARCH_ERROR,
			data: result
		});
	}

	static updateRegionals(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_FOUND,
			data: result
		});
	}

	static regionalSearchError(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_ERROR,
			data: result
		});
	}
}

export default ApiResponseActions;