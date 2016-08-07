"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { searchActionConstants } from "../constants/ActionConstants";
import APIRequests from "../requests/APIRequests";

class SearchActions {
	changeRegion(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_REGION,
			data: value
		});
	}

	changeSummoner(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_SUMMONER,
			data: value
		});
	}

	changeQueryLength(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_QRYLEN,
			data: value
		});
	}

	changeArrowNavigation(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_ARROWNAV,
			data: value
		});
	}

	resetResults(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.RESET
		});
	}
}

export default new SearchActions();