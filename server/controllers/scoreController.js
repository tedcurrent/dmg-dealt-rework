"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");

var _results = {};
var _saveParams = {};

function _saveUpdate(callback) {
	HighScoreController.saveUpdate(_saveParams, function(err, newHs) {
		if (err) {
			return callback(err);
		}

		_results.highScore = newHs;
		_results.newHighScore = true;
		callback(err, _results);
	});
};

var ScoreController = {
	newHighScore: function(req, callback) {
		_results = {};
		_saveParams = {};

		HighScoreController.findBySummonerId(req, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			_saveParams.req = req;
			_saveParams.highScore = oldHs;

			if (!oldHs) {
				_saveUpdate(callback);
			} else {
				if (req.body.dmgDealt > oldHs.game.dmgDealt) {
					_saveUpdate(callback);
				} else {
					_results = {
						highScore: oldHs,
						newHighScore: false
					};

					callback(err, _results);
				}
			}
		});
	},

	regionalScores: function(callback) {
		// return highscores and resolve global score
	}
};

module.exports = ScoreController;