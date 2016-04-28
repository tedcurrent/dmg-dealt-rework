"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var APIRequests = require("../requests/APIRequests");

// Flux actions for any requests made towards the API
var ApiRequestActions = {
	// Start a fetch for summoner data
	getSummoner: function(query) {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		APIRequests.getSummoner(query);
	},

	// Start a fetch for single summoner games
	getPersonalGames: function(query) {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		APIRequests.getPersonalGames(query);
	},

	// Start a fetch for the top games in all regions
	getRegionalGames: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getRegionalGames();
	},

	// Start clean up for any fetched games
	cleanUpGames: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_CLEAN_UP
		});
	}
};

module.exports = ApiRequestActions;