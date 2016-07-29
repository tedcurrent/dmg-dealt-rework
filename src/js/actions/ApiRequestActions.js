"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var APIRequests = require("../requests/APIRequests");

var ApiRequestActions = {
	getSummoner: function(query) {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		APIRequests.getSummoner(query);
	},

	getPersonalGames: function(query) {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getPersonalGames(query);
	},

	getRegionalGames: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getRegionalGames();
	},

	cleanUpGames: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.GAMES_CLEAN_UP
		});
	}
};

module.exports = ApiRequestActions;