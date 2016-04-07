"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var Util = require("../utils/util");

router.get("/getGames/:name/:region", function(req, res, next) {
	var summonerInfo = {
			name: req.params.name,
			region: req.params.region
	};

	LolApiController.getRecentGamesWithSummoner(summonerInfo, function(err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

router.post("/checkNewHighScore", function(req, res, next) {
	res.json({
		hello: "I will eventually check for a new highscore",
		req: req.body
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