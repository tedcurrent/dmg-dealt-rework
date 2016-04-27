"use strict";
var mongoose = require("mongoose");
var highScoreModel = require("../models/highScoreModel");

// Database logic for managing top damages for summoners
module.exports = {
	/**
		* A helper function for building the model
		* @param {object} Request object sent from the client 
		* @param {object} HighScore to be updated
		* @return {object} Updated HighScore
	*/
	setModel: function(req, model) {
		model.date = Date.now();

		model.summoner = {
			summonerId: req.body.summoner.id,
			summonerName: req.body.summoner.name,
			profileIconId: req.body.summoner.profileIconId,
			region: req.body.summoner.region,
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

	/**
		* Either creates a new or updates a highScoreModel
		* @param {object} An object, which contains a highscore to be updated (if any) and a request sent from client
		* @param {function} Callback
		* @return {function} A callback is returned with a potential error and newly saved/updated model
	*/
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

	/**
		* Finds a single highScore
		* @param {object} A request object containing a summoner id and region
		* @param {function} Callback
		* @return {function} A callback is returned with a potential error and a found highScore (if any)
	*/
	findBySummonerId: function(req, callback) {
		highScoreModel.findOne({"summoner.summonerId": req.body.id, "summoner.region": req.body.region}, function(err, oldHighScore) {
			callback(err, oldHighScore);
		});
	},

	/**
		* Gets the top (by dmgDealt) highScores from each region
		* @param {function} Callback 
		* @return {function} A callback is returned with a potential error and an array of highScores (object if empty)
	*/
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