"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");
var _ = require("lodash");

// Get the top players and their games from each region
module.exports = {
	getRegionalScores: function(callback) {
		HighScoreController.getRegionalTopScores(function(err, results) {
			if (err || !results.length) {
				return callback(err, {});
			}

			var globalScore = _createGlobalScore(results);
			_setGlobalAsFirstInList(results, globalScore);
			callback(err, results);
		});
	}
};

function _createGlobalScore(scores) {
	var globalScore = _.maxBy(scores, function (score) {return score.highScore.game.dmgDealt});
	var cloneScore = _.clone(globalScore);
	cloneScore._id = "global";
	return cloneScore;
};

function _setGlobalAsFirstInList(scores, globalScore) {
	return scores.unshift(globalScore);
};