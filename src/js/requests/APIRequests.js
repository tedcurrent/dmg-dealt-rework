"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");
var _ = require("lodash");
var Util = require("../util/utils");

// Requests towards the server
var APIRequests = {
	/**
		* Get a summoner with summoner name and region
		* @param {object} A query object with summoner name and region from the client 
		* @return {function} Returns with a response action and results
	*/
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

	/**
		* Get a list of games and a top game for any summoner
		* NOTE: The GET can come from an /:id/:region route or search result click
		* @param {object} A query object containing summoner id and region
		* @return {function} Returns with a response action and results
	*/
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

	/**
		* Post the top score found from recent games, expecting a new top score
		* @param {object} A query object containing a top game with summoner and game info 
		* @param {function} Callback
		* @return {function} A callback is returned with info on whether a new highscore was made and the score itself
	*/
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

	/**
		* Get top games from all regions 
		* @return {function} Returns with a response action and results
	*/
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

