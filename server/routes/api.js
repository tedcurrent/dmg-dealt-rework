"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var HighScoreController = require("../controllers/highScoreController");
var Util = require("../utils/util");

router.get("/getSummoner/:name/:region", function(req, res, next) {
	var summonerInfo = {
			name: req.params.name,
			region: req.params.region
	};

	LolApiController.getSummoner(summonerInfo, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

router.get("/getGames/:summonerId", function(req, res, next) {
	var summonerId = req.params.summonerId;

	LolApiController.getRecentGamesWithSummonerId(summonerId, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

router.post("/saveHighScore", function(req, res, next) {
	HighScoreController.save(req, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

module.exports = router;


// Eventual return
// {
// 	summoner: {},
// 	highScore: {},
// 	recentScores: {},
// 	newHighScore: boolean
// }

// Flow:
// Front calls: get Games
// Front calls: check for new Highscore after get Games
// This way front is responsible for the flow and server just does stuff