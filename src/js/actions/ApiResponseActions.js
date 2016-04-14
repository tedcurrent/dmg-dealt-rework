"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");

var ApiResponseActions = {
	updateSummonerSearchResult: function(result) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUMMONER_SEARCH_RESULT,
			data: result
		});
	}
};

module.exports = ApiResponseActions;