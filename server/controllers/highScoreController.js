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

	create: function(req, callback) {
		var highScore = new highScoreModel();
		highScore = this.setModel(req, highScore);
		highScore.save(function(err, highScore) {
			callback(err, highScore);
		});
	},

	update: function(req, oldHighScore, callback) {
		oldHighScore = this.setModel(req, oldHighScore);
		oldHighScore.save(function(err, newHighScore) {
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
			            "summonerdId": "$summonerId",
			            "summonerName": "$summonerName",
			            "region": "$region",
			            "profileIconId": "$profileIconId",
			            "game" : "$game"
		        	}
		    	}
		    })
		    .exec(function(err, res) {
		    	console.log("ehh");
		    	callback(err, res);
		    });
	}

};

// Users.aggregate()
//   .group({ _id: null, maxBalance: { $max: '$balance' } })
//   .select('-id maxBalance')
//   .exec(function (err, res) {
//     if (err) return handleError(err);
//     console.log(res); // [ { maxBalance: 98 } ]
// });


// db.highscores.aggregate([
//     { $sort: { "game.dmgDealt": -1 } },
//     {
//     $group : {
//         "_id" : "$region",
//         "highScore" : { 
//             $first : {
// 	            "summonerdId": "$summonerId",
// 	            "summonerName": "$summonerName",
// 	            "region": "$region",
// 	            "profileIconId": "$profileIconId",
// 	            "game" : "$game"
//             }
//         } 
//     }
// }]);