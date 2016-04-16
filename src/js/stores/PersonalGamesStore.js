"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";

var _results = {
	summoner: {},
	games: [],
	highScore: {},
	newHighScore: false,
	errors: 0
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
			_results.summoner = action.data.hs.highScore.summoner;
			_results.games = action.data.games;
			_results.highScore = action.data.hs.highScore.game;
			_results.newHighScore = action.data.hs.newHighScore;
			_results.errors = 0;
			console.log(_results);
			PersonalScoresStore.emitChange();
			break;
		case AppConstants.GAMES_SEARCH_ERROR:
			++_results.errors;
			console.log(_results);
			PersonalScoresStore.emitChange();
			break;
		default:
	}
});

module.exports = PersonalScoresStore;