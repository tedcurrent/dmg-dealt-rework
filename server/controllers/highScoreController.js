"use strict";
var mongoose = require("mongoose");
var highScoreModel = require("../models/highScoreModel");

module.exports = {
	setModel: function(req, model) {
		model.summonerId = req.body.summonerId;
		model.date = Date.now();
		model.summonerName = req.body.summonerName;
		model.profileIconId = req.body.profileIconId;
		model.region = req.body.region;
		model.game = {
			gameId: req.body.gameId,
			gameMode: req.body.gameMode,
			gameDate: req.body.gameDate,
			champion: req.body.champion,
			dmgDealt: req.body.dmgDealt
		}
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
		highScoreModel.findOne({summonerId: req.body.summonerId}, function(err, oldHighScore) {
			callback(err, oldHighScore);
		});
	},

	getRegionalTopScores: function(req, callback) {
		highScoreModel.aggregate()
			.sort({"game.dmgDealt": -1})
			.group({
				"_id": "$region",
				"highScore" : { 
		            $first : {
		            	"id": "$_id",
			            "summonerdId": "$summonerId",
			            "summonerName": "$summonerName",
			            "region": "$region",
			            "profileIconId": "$profileIconId",
			            "game" : "$game"
		        	}
		    	}
		    })
		    .exec(function(err, res) {
		    	callback(err, res);
		    });
	}

};