"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");

// Actions sent as results come from API ("callbacks")
var ApiResponseActions = {
	// Results for summoner found
	updateSummonerSearchResult: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_FOUND,
			data: result
		});
	},

	// An error in summoner search
	summonerSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_SEARCH_ERROR,
			data: result
		});
	},

	// Games for a single summoner found
	updatePersonalGames: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_FOUND,
			data: result
		});
	},

	// An error in summoner games
	gameSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_SEARCH_ERROR,
			data: result
		});
	},

	// Top games for each region found
	updateRegionals: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REGIONALS_FOUND,
			data: result
		});
	},

	// Error in top game search
	regionalSearchError: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REGIONALS_ERROR,
			data: result
		});
	}
};

module.exports = ApiResponseActions;