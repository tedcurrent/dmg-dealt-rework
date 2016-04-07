"use strict";
var LolApiController = require("./lolApiController");
var Util = require("../utils/util");

var ScoreController = {
	newSearch: function(params, callback) {
		LolApiController.getRecentGamesWithSummoner(params, function(err, result) {
			if (err) {
				return callback(err);
			}

			var recentResults = {
				summoner: result.summoner,
				games: Util.formatLolGames(result.games)
			};

			// Save to mongodb

			callback(err, recentResults);
		});
	}
};

module.exports = ScoreController;