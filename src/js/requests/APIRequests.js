"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");
var _ = require("lodash");
var Util = require("../util/utils");

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
					parsedGames = _.orderBy(parsedGames, ["dmgDealt"], ["desc"]);
					query.topGame = parsedGames[0];
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

	getRegionalGames: function(callback) {
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

