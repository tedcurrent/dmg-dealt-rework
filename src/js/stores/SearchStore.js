"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
import { searchActionConstants } from "../constants/ActionConstants";
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
var SearchStore = assign({}, EventEmitter.prototype, {
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
		case searchActionConstants.SUMMONER_FOUND:
			_store.results.summoner = action.data;
			_store.results.errors = 0;
			SearchStore.emitChange();
			break;
		case searchActionConstants.ERROR:
			_store.results.summoner = {};
			++_store.results.errors;
			SearchStore.emitChange();
			break;
		case searchActionConstants.CHANGE_REGION:
			_store.input.region = action.data;
			SearchStore.emitChange();
			break;
		case searchActionConstants.CHANGE_SUMMONER:
			_store.input.summoner = action.data;
			SearchStore.emitChange();
			break;
		case searchActionConstants.CHANGE_QRYLEN:
			_store.queryLengthOk = action.data;
			SearchStore.emitChange();
			break;
		case searchActionConstants.CHANGE_ARROWNAV:
			_store.resultSelected = action.data;
			SearchStore.emitChange();
			break;
		case searchActionConstants.RESET:
			_store.results.summoner = {};
			_store.results.errors = 0;
			_store.resultSelected = false;
			_store.queryLengthOk = true;
			SearchStore.emitChange();
			break;
		default:
	}
});

module.exports = SearchStore;