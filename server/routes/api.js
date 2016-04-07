"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var Util = require("../utils/util");

router.get("/getGames/:name/:region", function(req, res, next) {
	var summonerInfo = {
			name: req.params.name.toLowerCase(),
			region: req.params.region.toLowerCase()
	};
	
	LolApiController.getRecentGamesWithSummoner(summonerInfo, function(err, result) {
		if (err) {
			return next(err);
		}

		var recentResults = {
			summoner: result.summoner,
			games: Util.formatLolGames(result.games)
		};

		res.json(recentResults);
	});
});

module.exports = router;