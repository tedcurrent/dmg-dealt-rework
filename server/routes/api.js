"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var HighScoreController = require("../controllers/highScoreController");
var ScoreController = require("../controllers/scoreController");
var Util = require("../utils/util");

// GET summoner object with a summoner name and region
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

// GET summoner object with summoner id and region
router.get("/getSummonerWithId/:id/:region", function(req, res, next) {
	LolApiController.getSummonerWithId(req.params.id, req.params.region, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

// GET an array of games with summoner id and region
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

// GET an array of score objects
router.get("/getRegionalScores", function(req, res, next) {
	ScoreController.getRegionalScores(function (err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

// POST a request with summoner and top game information. Returns an old or new top score
router.post("/saveHighScore", function(req, res, next) {
	ScoreController.newHighScore(req, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

module.exports = router;