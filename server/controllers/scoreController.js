"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");

var _results = {};

function _saveUpdate(params, callback) {
	HighScoreController.saveUpdate(params, function(err, newHs) {
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
		HighScoreController.findBySummonerId(req, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			_results = {
				highScore: oldHs,
				newHighScore: false
			};

			if (!oldHs) {
				_saveUpdate({req: req}, callback);
			} else {
				if (req.body.dmgDealt > oldHs.game.dmgDealt) {
					_saveUpdate({req: req, highScore: oldHs}, callback);
				} else {
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