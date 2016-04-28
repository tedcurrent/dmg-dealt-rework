"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var APIRequests = require("../requests/APIRequests");

// Actions that can be used as the application is initialized
var InitActions = {
	initApp: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.API_REQUEST
		});
		APIRequests.getRegionalGames();
	}
};

module.exports = InitActions;