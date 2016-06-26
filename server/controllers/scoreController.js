"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");
var _ = require("lodash");

// Top game/score handling logic for saving, updating and pulling data in and out of database
module.exports = {
	trySaveNewHighScore: function(potentialHighScore, callback) {
		_getOldHighScore(potentialHighScore.id, potentialHighScore.region, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			if (_isNewHighScoreBetter(potentialHighScore.topGame, oldHs)) {
				_saveNewHighscore(potentialHighScore, oldHs, callback);
			} else {
				callback(err, {highScore: oldHs, newHighScore: false});
			}
		});
	}
};

function _getOldHighScore(summonerId, summonerRegion, callback) {
	HighScoreController.findBySummonerIdAndRegion(summonerId, summonerRegion, callback);
};

function _isNewHighScoreBetter(newHs, oldHs) {
	return !oldHs || newHs.dmgDealt > oldHs.game.dmgDealt;
};

function _saveNewHighscore(potentialHighScore, oldHs, callback) {
	// Summoner has to be searched for again, as the function is initiated with a summoner id and region only.
	// Other details (like profileIconId and name) are found here.
	LolApiController.getSummonerWithId(potentialHighScore.id, potentialHighScore.region, function(err, summoner) {
		if (err) {
			return callback(err);
		}

		potentialHighScore.summoner = summoner;

		var newHighScore = HighScoreController.setDocument(potentialHighScore, oldHs);

		HighScoreController.saveScore(newHighScore, function(err, newHs) {
			if (err) {
				return callback(err);
			}

			callback(err, {highScore: newHs, newHighScore: true});
		});
	});
};