"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");

var ScoreController = {
	newHighScore: function(req, callback) {
		HighScoreController.findBySummonerId(req, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			var results = {
				highScore: oldHs,
				newHighScore: false
			};

			if (!oldHs) {
				HighScoreController.create(req, function(err, newHs) {
					if (err) {
						return callback(err);
					}

					results.highScore = newHs;
					results.newHighScore = true;
					callback(err, results);
				});

			} else {
				if (req.body.dmgDealt > oldHs.game.dmgDealt) {
					HighScoreController.update(req, oldHs, function(err, newHs) {
						if (err) {
							return callback(err);
						}

						results.highScore = newHs;
						results.newHighScore = true;
						callback(err, results);
					});

				} else {
					callback(err, results);
				}
			}
			
		});
	}
};

module.exports = ScoreController;