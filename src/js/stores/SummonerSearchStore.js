"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";
var _results = {
	summoner: {},
	errors: 0
};

var SummonerSearchStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		return _results;
	}

});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case AppConstants.SUMMONER_FOUND:
			_results.summoner = action.data;
			_results.errors = 0;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_SEARCH_ERROR:
			_results.summoner = {};
			++_results.errors;
			SummonerSearchStore.emitChange();
			break;
		default:
	}
});

module.exports = SummonerSearchStore;