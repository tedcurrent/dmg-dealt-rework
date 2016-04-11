"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");
var _ = require("lodash");

var _results = {};

function _saveUpdate(req, oldHs, callback) {
	var saveParams = {
		req: req,
		highScore: oldHs
	};

	HighScoreController.saveUpdate(saveParams, function(err, newHs) {
		if (err) {
			return callback(err);
		}

		_results.highScore = newHs;
		_results.newHighScore = true;
		callback(err, _results);
	});
};

function _addGlobalScore() {
	var globalTopScore = _.clone(_results[0]);
	globalTopScore._id = "global";
	_results.unshift(globalTopScore);
};

var ScoreController = {
	newHighScore: function(req, callback) {
		_results = {};

		HighScoreController.findBySummonerId(req, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			if (!oldHs || req.body.dmgDealt > oldHs.game.dmgDealt) {
				_saveUpdate(req, oldHs, callback);
			} else {
				_results = {
					highScore: oldHs,
					newHighScore: false
				};

				callback(err, _results);
			}
		});
	},

	getRegionalScores: function(callback) {
		_results = {};
		// TODO: Use score controller to get the global score and do some logical formatting if needed
		HighScoreController.getRegionalTopScores(function(err, result) {
			_results = _.orderBy(result, ["highScore.game.dmgDealt"], ["desc"]);
			_addGlobalScore();
			callback(err, _results);
		});
	}
};

module.exports = ScoreController;