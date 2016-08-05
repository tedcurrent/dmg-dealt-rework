"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
import { searchActionConstants, apiActionConstants } from "../constants/ActionConstants";

var ApiResponseActions = {
	updateSummonerSearchResult: function(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.SUMMONER_FOUND,
			data: result
		});
	},

	summonerSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.ERROR,
			data: result
		});
	},

	updatePersonalGames: function(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_FOUND,
			data: result
		});
	},

	gameSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_SEARCH_ERROR,
			data: result
		});
	},

	updateRegionals: function(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_FOUND,
			data: result
		});
	},

	regionalSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.REGIONALS_ERROR,
			data: result
		});
	}
};

module.exports = ApiResponseActions;