"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { searchActionConstants } from "../constants/ActionConstants";
import APIRequests from "../requests/APIRequests";

class SearchActions {
	static changeRegion(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_REGION,
			data: value
		});
	}

	static changeSummoner(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_SUMMONER,
			data: value
		});
	}

	static changeQueryLength(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_QRYLEN,
			data: value
		});
	}

	static changeArrowNavigation(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.CHANGE_ARROWNAV,
			data: value
		});
	}

	static resetResults(value) {
		AppDispatcher.dispatch({
			actionType: searchActionConstants.RESET
		});
	}
}

export default SearchActions;