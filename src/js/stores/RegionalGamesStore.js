"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { apiActionConstants } from "../constants/ActionConstants";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _results = {
	games: [],
	errors: 0
};

// Store for all regional score related items
class RegionalScoresStore extends EventEmitter {
	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getAll() {
		return _results;
	}

}

const regionalScoresStore = new RegionalScoresStore();

AppDispatcher.register((action) => {
	switch(action.actionType) {
		case apiActionConstants.REGIONALS_FOUND:
			_results.games = action.data;
			_results.errors = 0;
			regionalScoresStore.emitChange();
			break;
		case apiActionConstants.REGIONALS_ERROR:
			_results.games = [];
			++_results.errors;
			regionalScoresStore.emitChange();
			break;
		default:
	}
});

export default regionalScoresStore;