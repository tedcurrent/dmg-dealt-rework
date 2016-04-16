"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var HighScoreController = require("../controllers/highScoreController");
var ScoreController = require("../controllers/scoreController");
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

router.get("/getGames/:summonerId/:region", function(req, res, next) {
	var summonerInfo = {
			id: req.params.summonerId,
			region: req.params.region
	};

	LolApiController.getRecentGamesWithSummonerInfo(summonerInfo, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

router.post("/saveHighScore", function(req, res, next) {
	ScoreController.newHighScore(req, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

router.get("/getRegionalScores", function(req, res, next) {
	ScoreController.getRegionalScores(function (err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

module.exports = router;

// Flow:
// Front calls: get summoner
// Front calls: get Games with the summoner
// Front calls: save highscore after got games
// Front reacts: get new highscores and update + popup if new highscore
// This way front is responsible for the flow and server just does stuff