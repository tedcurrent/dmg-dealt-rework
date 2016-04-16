"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");
var _ = require("lodash");

var APIRequests = {
	getSummoner: function(query) {
		if (query.summonerName === "" || query.summonerRegion === "") {
			return;
		}

		NProgress.start();
		request
			.get("/api/getSummoner/" + query.summonerName + "/" + query.summonerRegion)
			.end(function(err, result) {
				if (err) {
					ApiResponseActions.summonerSearchError(JSON.parse(err.response.text));
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
					ApiResponseActions.gameSearchError(JSON.parse(err.response.text));
					NProgress.done();
				} else {
					var parsedGames = _.orderBy(JSON.parse(result.text), ["dmgDealt"], ["desc"]);
					query.highScore = parsedGames[0];
					NProgress.set(0.5);
					this.saveHighScore(query, function(err, hsResults) {
						if (err) {
							ApiResponseActions.gameSearchError(JSON.parse(err.response.text));
						} else {
							var hs = JSON.parse(hsResults.text);

							var finalResults = {
								summoner: hs.highScore.summoner,
								games: parsedGames,
								highScore: hs.highScore.game,
								newHighScore: hs.newHighScore
							};

							ApiResponseActions.updatePersonalGames(finalResults);
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
	}
};

module.exports = APIRequests;

