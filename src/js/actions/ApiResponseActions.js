"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { searchActionConstants, apiActionConstants } from "../constants/ActionConstants";

class ApiResponseActions {
	updateSummonerSearchResult(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.SUMMONER_FOUND,
			data: result
		});
	}

	summonerSearchError(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.ERROR,
			data: result
		});
	}

	updatePersonalGames(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_FOUND,
			data: result
		});
	}

	gameSearchError(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_SEARCH_ERROR,
			data: result
		});
	}

	updateRegionals(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_FOUND,
			data: result
		});
	}

	regionalSearchError(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_ERROR,
			data: result
		});
	}
}

export default new ApiResponseActions();