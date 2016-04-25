"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var APIRequests = require("../requests/APIRequests");

var InitActions = {
	initApp: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		APIRequests.getRegionalGames();
	}
};

module.exports = InitActions;