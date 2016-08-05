"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = "change";
var _store = {
	results: {
		summoner: {},
		errors: 0
	},
	input: {
		region: "euw",
		summoner: ""
	},
	queryLengthOk: true,
	resultSelected: false
};

// Store for all summoner search related items
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
		return _store;
	}
});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case AppConstants.SUMMONER_FOUND:
			_store.results.summoner = action.data;
			_store.results.errors = 0;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_SEARCH_ERROR:
			_store.results.summoner = {};
			++_store.results.errors;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_CHANGE_REGION:
			_store.input.region = action.data;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_CHANGE_SUMMONER:
			_store.input.summoner = action.data;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_CHANGE_QRYLEN:
			_store.queryLengthOk = action.data;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_CHANGE_ARROWNAV:
			_store.resultSelected = action.data;
			SummonerSearchStore.emitChange();
			break;
		case AppConstants.SUMMONER_RESET:
			_store.results.summoner = {};
			_store.results.errors = 0;
			_store.resultSelected = false;
			_store.queryLengthOk = true;
			SummonerSearchStore.emitChange();
			break;
		default:
	}
});

module.exports = SummonerSearchStore;