"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");

var ApiResponseActions = {
	updateSummonerSearchResult: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_FOUND,
			data: result
		});
	},

	summonerSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_SEARCH_ERROR,
			data: result
		});
	},

	updatePersonalGames: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_FOUND,
			data: result
		});
	},

	gameSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_SEARCH_ERROR,
			data: result
		});
	},

	updateRegionals: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REGIONALS_FOUND,
			data: result
		});
	},

	regionalSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REGIONALS_ERROR,
			data: result
		});
	}
};

module.exports = ApiResponseActions;