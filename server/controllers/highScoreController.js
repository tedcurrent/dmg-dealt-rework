"use strict";

const mongoose = require("mongoose");
const highScoreModel = require("../models/highScoreModel");

// Database logic for managing top damages for summoners
module.exports = class HighScoreController {
	static setDocument(newHighScore, oldHighScore) {
		let highScore = oldHighScore;

		if (!highScore)
			highScore = new highScoreModel();

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
			dmgDealt: newHighScore.topGame.dmgDealt,
			stats: {
				timePlayed: newHighScore.topGame.stats.timePlayed,
				kills: newHighScore.topGame.stats.kills,
				deaths: newHighScore.topGame.stats.deaths,
				assists: newHighScore.topGame.stats.assists,
				largestMultiKill: newHighScore.topGame.stats.largestMultiKill,
				physicalDamage: newHighScore.topGame.stats.physicalDamage,
				magicDamage: newHighScore.topGame.stats.magicDamage,
				trueDamage: newHighScore.topGame.stats.trueDamage
			}
		};

		return highScore;
	}

	static saveScore(highScore, callback) {
		highScore.save((err, newHighScore) => {
			callback(err, newHighScore);
		});
	}

	static findBySummonerIdAndRegion(summonerId, summonerRegion, callback) {
		highScoreModel.findOne({
			"summoner.summonerId": summonerId, 
			"summoner.region": summonerRegion
		}, (err, oldHighScore) => {
			callback(err, oldHighScore);
		});
	}

	static getRegionalTopScores(callback) {
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
		    .exec((err, res) => {
		    	callback(err, res);
		    });
	}

	static removeScoreByIdAndRegion(summonerId, summonerRegion, callback) {
		highScoreModel.remove({
			"summoner.summonerId": summonerId,
			"summoner.region": summonerRegion
		}, callback);
	}
}