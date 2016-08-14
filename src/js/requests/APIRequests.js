"use strict";

import ApiResponseActions from "../actions/ApiResponseActions";
import NProgress from "nprogress";
import isEmpty from "lodash/isempty";
import Util from "../util/utils";
import "whatwg-fetch";

// Requests towards the server
class APIRequests {
	static getSummoner(query) {
		if (query.summoner === "" || query.region === "")
			return;

		NProgress.start();
		fetch("/api/getSummoner/" + query.summoner + "/" + query.region)
			.then(_checkStatus)
			.then(result => result.json())
			.then(json => ApiResponseActions.updateSummonerSearchResult(!isEmpty(json) ? json : false))
			.catch(err => ApiResponseActions.summonerSearchError(err))
			.then(NProgress.done);
	}

	static getPersonalGames(query) {
		if (isEmpty(query))
			return;

		NProgress.start();
		let parsedGames;
		fetch("/api/getGames/" + query.id + "/" + query.region)
			.then(_checkStatus)
			.then(result => result.json())
			.then((json) => {
				parsedGames = Util.cleanEmptyDamages(json);
				query.topGame = Util.getHighestDamageGame(parsedGames);
				return _saveHighScore(query);
			})
			.then(hsResults => ApiResponseActions.updatePersonalGames({games: parsedGames, hs: hsResults}))
			.catch(err => ApiResponseActions.gameSearchError(err))
			.then(NProgress.done);
	}

	static getRegionalGames() {
		NProgress.start();
		fetch("/api/getRegionalScores")
			.then(_checkStatus)
			.then(result => result.json())
			.then(json => ApiResponseActions.updateRegionals(json))
			.catch(err => ApiResponseActions.regionalSearchError(err))
			.then(NProgress.done);
	}
}

function _checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function _saveHighScore(query) {
	return new Promise((resolve, reject) => {
		fetch("/api/saveHighScore", {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(query)
		})
		.then(_checkStatus)
		.then(result => result.json())
		.then(json => resolve(json))
		.catch(err => reject(err));
	});
}

export default APIRequests;