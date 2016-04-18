"use strict";
var mongoose = require("mongoose");
var highScoreModel = require("../models/highScoreModel");

module.exports = {
	setModel: function(req, model) {
		model.date = Date.now();

		model.summoner = {
			summonerId: req.body.id,
			summonerName: req.body.name,
			profileIconId: req.body.profileIconId,
			region: req.body.region,
		};

		model.game = {
			gameId: req.body.topGame.gameId,
			gameMode: req.body.topGame.gameMode,
			gameDate: req.body.topGame.gameDate,
			champion: req.body.topGame.champion,
			dmgDealt: req.body.topGame.dmgDealt
		};

		return model;
	},

	saveUpdate: function(params, callback) {
		var highScore = params.highScore;

		if (!highScore) {
			highScore = new highScoreModel();
		}

		highScore = this.setModel(params.req, highScore);
		highScore.save(function(err, newHighScore) {
			callback(err, newHighScore);
		});
	},

	findBySummonerId: function(req, callback) {
		highScoreModel.findOne({"summoner.summonerId": req.body.id}, function(err, oldHighScore) {
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