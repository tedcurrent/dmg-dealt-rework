"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";

var SummonerSearchStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case AppConstants.SUMMONER_SEARCH_RESULT:
			console.log(action.data);
			SummonerSearchStore.emitChange();
			break;
		default:
	}
});

module.exports = SummonerSearchStore;

