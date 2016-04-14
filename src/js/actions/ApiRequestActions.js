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
	}
};

module.exports = ApiRequestActions;