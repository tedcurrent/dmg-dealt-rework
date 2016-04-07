"use strict";
var LolApiController = require("./lolApiController");
var Util = require("../utils/util");

var ScoreController = {
	newScores: function(params, callback) {
		LolApiController.getRecentGamesWithSummoner(params, function(err, result) {
			if (err) {
				return callback(err);
			}

			// Save to mongodb

			callback(err, result);
		});
	}
};

module.exports = ScoreController;