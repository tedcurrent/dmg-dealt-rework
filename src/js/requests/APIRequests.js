"use strict";

import ApiResponseActions from "../actions/ApiResponseActions";
import request from "superagent";
import NProgress from "nprogress";
import isEmpty from "lodash/isempty";
import Util from "../util/utils";

// Requests towards the server
class APIRequests {
	static getSummoner(query) {
		if (query.summoner === "" || query.region === "")
			return;

		NProgress.start();
		request
			.get("/api/getSummoner/" + query.summoner + "/" + query.region)
			.end((err, result) => {
				if (err) {
					ApiResponseActions.summonerSearchError(err);
				} else {
					let parsedResults = JSON.parse(result.text);
					parsedResults = !isEmpty(parsedResults) ? parsedResults : false;
					ApiResponseActions.updateSummonerSearchResult(parsedResults);
				}
				NProgress.done();
			});
	}

	static getPersonalGames(query) {
		if (isEmpty(query))
			return;

		NProgress.start();
		request
			.get("/api/getGames/" + query.id + "/" + query.region)
			.end((err, result) => {
				if (err) {
					ApiResponseActions.gameSearchError(err);
					NProgress.done();
				} else {
					const parsedGames = Util.cleanEmptyDamages(JSON.parse(result.text));
					query.topGame = Util.getHighestDamageGame(parsedGames);
					// A highscore is returned with personal games
					this.saveHighScore(query, (err, hsResults) => {
						if (err) {
							ApiResponseActions.gameSearchError(err);
						} else {
							const finalResult = {
								games: parsedGames,
								hs: JSON.parse(hsResults.text)
							};
							ApiResponseActions.updatePersonalGames(finalResult);
						}
						NProgress.done();
					});
				}
			});
	}

	static saveHighScore(query, callback) {
		request
			.post("/api/saveHighScore/")
			.send(query)
			.end((err, result) => {
				callback(err, result);
			});
	}

	static getRegionalGames() {
		NProgress.start();
		request
			.get("/api/getRegionalScores")
			.end((err, result) => {
				if (err) {
					ApiResponseActions.regionalSearchError(err);
				} else {
					ApiResponseActions.updateRegionals(JSON.parse(result.text));
				}
				
				NProgress.done();
			});
	}
}

export default APIRequests;