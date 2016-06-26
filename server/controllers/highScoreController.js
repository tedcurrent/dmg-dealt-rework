"use strict";
var mongoose = require("mongoose");
var highScoreModel = require("../models/highScoreModel");

// Database logic for managing top damages for summoners
module.exports = {
	setDocument: function(newHighScore, oldHighScore) {
		var highScore = oldHighScore;

		if (!highScore) {
			highScore = new highScoreModel();
		}

		highScore.date = Date.now();

		highScore.summoner = {
			summonerId: newHighScore.summoner.id,
			summonerName: newHighScore.summoner.name,
			profileIconId: newHighScore.summoner.profileIconId,
			region: newHighScore.summoner.region,
		};

		highScore.game = {
			gameId: newHighScore.topGame.gameId,
			gameMode: newHighScore.topGame.gameMode,
			gameDate: newHighScore.topGame.gameDate,
			champion: newHighScore.topGame.champion,
			dmgDealt: newHighScore.topGame.dmgDealt
		};

		return highScore;
	},

	saveScore: function(highScore, callback) {
		highScore.save(function(err, newHighScore) {
			callback(err, newHighScore);
		});
	},

	findBySummonerIdAndRegion: function(summonerId, summonerRegion, callback) {
		highScoreModel.findOne({"summoner.summonerId": summonerId, "summoner.region": summonerRegion}, function(err, oldHighScore) {
			callback(err, oldHighScore);
		});
	},

	getRegionalTopScores: function(callback) {
		highScoreModel.aggregate()
			.sort({"game.dmgDealt": -1})
			.group({
				"_id": "$summoner.region",
				"highScore" : { 
		            $first : {
		            	"id": "$_id",
		            	"date": "$date",
			            "summoner": "$summoner",
			            "game" : "$game"
		        	}
		    	}
		    })
		    .exec(function(err, res) {
		    	callback(err, res);
		    });
	}

};