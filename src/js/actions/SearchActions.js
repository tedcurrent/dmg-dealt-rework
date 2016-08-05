"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var APIRequests = require("../requests/APIRequests");

var SearchActions = {
	changeRegion: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_CHANGE_REGION,
			data: value
		});
	},

	changeSummoner: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_CHANGE_SUMMONER,
			data: value
		});
	},

	changeQueryLength: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_CHANGE_QRYLEN,
			data: value
		});
	},

	changeArrowNavigation: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_CHANGE_ARROWNAV,
			data: value
		});
	},

	resetResults: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_RESET
		});
	}
};

module.exports = SearchActions;