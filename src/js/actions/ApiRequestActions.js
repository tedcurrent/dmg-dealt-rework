"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var APIRequests = require("../requests/APIRequests");
import { apiActionConstants } from "../constants/ActionConstants";

var ApiRequestActions = {
	getSummoner: function(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		APIRequests.getSummoner(query);
	},

	getPersonalGames: function(query) {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getPersonalGames(query);
	},

	getRegionalGames: function() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.API_REQUEST
		});
		this.cleanUpGames();
		APIRequests.getRegionalGames();
	},

	cleanUpGames: function() {
		AppDispatcher.dispatch({
			actionType: apiActionConstants.GAMES_CLEAN_UP
		});
	}
};

module.exports = ApiRequestActions;