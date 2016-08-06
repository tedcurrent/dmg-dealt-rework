"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");
var _ = require("lodash");
import Util from "../util/utils";

// Requests towards the server
var APIRequests = {
	getSummoner: function(query) {
		if (query.summoner === "" || query.region === "") {
			return;
		}

		NProgress.start();
		request
			.get("/api/getSummoner/" + query.summoner + "/" + query.region)
			.end(function(err, result) {
				if (err) {
					ApiResponseActions.summonerSearchError(err);
				} else {
					var parsedResults = JSON.parse(result.text);
					parsedResults = !_.isEmpty(parsedResults) ? parsedResults : false;
					ApiResponseActions.updateSummonerSearchResult(parsedResults);
				}
				NProgress.done();
			});
	},

	getPersonalGames: function(query) {
		if (_.isEmpty(query)) {
			return;
		}

		NProgress.start();
		request
			.get("/api/getGames/" + query.id + "/" + query.region)
			.end(function(err, result) {
				if (err) {
					ApiResponseActions.gameSearchError(err);
					NProgress.done();
				} else {
					var parsedGames = Util.cleanEmptyDamages(JSON.parse(result.text));
					query.topGame = Util.getHighestDamageGame(parsedGames);
					// A highscore is returned with personal games
					this.saveHighScore(query, function(err, hsResults) {
						if (err) {
							ApiResponseActions.gameSearchError(err);
						} else {
							var finalResult = {
								games: parsedGames,
								hs: JSON.parse(hsResults.text)
							};
							ApiResponseActions.updatePersonalGames(finalResult);
						}
						NProgress.done();
					});
				}
			}.bind(this));
	},

	saveHighScore: function(query, callback) {
		request
			.post("/api/saveHighScore/")
			.send(query)
			.end(function(err, result) {
				if (err) {
					callback(err, result);
				} else {
					callback(null, result);
				}
			});
	},

	getRegionalGames: function() {
		NProgress.start();
		request
			.get("/api/getRegionalScores")
			.end(function(err, result) {
				if (err) {
					ApiResponseActions.regionalSearchError(err);
				} else {
					var parsedGames = JSON.parse(result.text);
					ApiResponseActions.updateRegionals(parsedGames);
				}
				
				NProgress.done();
			});
	}
};

module.exports = APIRequests;

