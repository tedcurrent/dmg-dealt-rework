"use strict";
var mongoose = require("mongoose");
var highScoreModel = require("../models/highScoreModel");

module.exports = {
	save: function(req, callback) {
		var highScore = new highScoreModel({
			summonerId: req.body.summonerId,
			summonerName: req.body.summonerName,
			profileIconId: req.body.profileIconId,
			region: req.body.region,
			game: {
				gameId: req.body.gameId,
				gameMode: req.body.gameMode,
				gameDate: req.body.gameDate,
				champion: req.body.champion,
				dmgDealt: req.body.dmgDealt
			}
		});
		highScore.save(function(err, highScore) {
			callback(err, highScore);
		});
	},

};

// Needs:
// save - fresh highscore
// update - if dmgDealt is higher, update
// findWithSummonerId - get the existing set to compare dmgDealt