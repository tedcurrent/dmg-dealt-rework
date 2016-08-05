"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
import { searchActionConstants } from "../constants/ActionConstants";
var APIRequests = require("../requests/APIRequests");

var SearchActions = {
	changeRegion: function(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_REGION,
			data: value
		});
	},

	changeSummoner: function(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_SUMMONER,
			data: value
		});
	},

	changeQueryLength: function(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_QRYLEN,
			data: value
		});
	},

	changeArrowNavigation: function(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_ARROWNAV,
			data: value
		});
	},

	resetResults: function(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.RESET
		});
	}
};

module.exports = SearchActions;