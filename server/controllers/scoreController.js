"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");

var _results = {};

function _createNew(req, callback) {
	HighScoreController.create(req, function(err, newHs) {
		if (err) {
			return callback(err);
		}

		_results.highScore = newHs;
		_results.newHighScore = true;
		callback(err, _results);
	});
};

function _updateOld(req, oldHs, callback) {
	HighScoreController.update(req, oldHs, function(err, newHs) {
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
				_createNew(req, callback);
			} else {
				if (req.body.dmgDealt > oldHs.game.dmgDealt) {
					_updateOld(req, oldHs, callback);
				} else {
					callback(err, _results);
				}
			}
			
		});
	}
};

module.exports = ScoreController;