"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";
var _results = {
	
};

var PersonalScoresStore = assign({}, EventEmitter.prototype, {
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
		case AppConstants.GAMES_FOUND:
			console.log(action.data);
			PersonalScoresStore.emitChange();
			break;
		case AppConstants.GAMES_SEARCH_ERROR:
			console.log(action.data);
			PersonalScoresStore.emitChange();
			break;
		default:
	}
});

module.exports = PersonalScoresStore;