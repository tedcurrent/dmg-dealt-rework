"use strict";

const express = require("express");
const router = express.Router();
const LolApiController = require("../controllers/lolApiController");
const HighScoreController = require("../controllers/highScoreController");
const ScoreController = require("../controllers/scoreController");
const RegionalController = require("../controllers/regionalController");
const Util = require("../utils/util");

// GET summoner object with a summoner name and region
router.get("/getSummoner/:name/:region", (req, res, next) => {
	const summonerInfo = {
			name: req.params.name,
			region: req.params.region
	};

	LolApiController.getSummoner(summonerInfo, (err, result) => {
		if (err)
			return next(err);
		res.json(result);
	});
});

// GET summoner object with summoner id and region
router.get("/getSummonerWithId/:id/:region", (req, res, next) => {
	LolApiController.getSummonerWithId(req.params.id, req.params.region, (err, result) => {
		if (err)
			return next(err);
		res.json(result);
	});
});

// GET an array of games with summoner id and region
router.get("/getGames/:summonerId/:region", (req, res, next) => {
	const summonerInfo = {
			id: req.params.summonerId,
			region: req.params.region
	};

	LolApiController.getRecentGamesWithSummonerInfo(summonerInfo, (err, result) => {
		if (err)
			return next(err);
		res.json(result);
	});
});

// GET an array of score objects
router.get("/getRegionalScores", (req, res, next) => {
	RegionalController.getRegionalScores( (err, result) => {
		if (err)
			return next(err);

		res.json(result);
	});
});

// POST a request with summoner and top game information. Returns an old or new top score
router.post("/saveHighScore", (req, res, next) => {
	const potentialHighScore = req.body;

	ScoreController.trySaveNewHighScore(potentialHighScore, (err, result) => {
		if (err)
			return next(err);
		res.json(result);
	});
});

module.exports = router;