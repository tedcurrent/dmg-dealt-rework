"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";

var _results = {
	games: [],
	errors: 0
};

var RegionalScoresStore = assign({}, EventEmitter.prototype, {
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
		case AppConstants.REGIONALS_FOUND:
			_results.games = action.data;
			_results.errors = 0;
			RegionalScoresStore.emitChange();
			break;
		case AppConstants.REGIONALS_ERROR:
			_results.games = [];
			++_results.errors;
			RegionalScoresStore.emitChange();
			break;
		default:
	}
});

module.exports = RegionalScoresStore;