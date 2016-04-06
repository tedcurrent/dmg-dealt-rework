"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");
var Util = require("../utils/util");

router.get("/getGames/:name/:region", function(req, res, next) {
	var params = {
		name: req.params.name.toLowerCase(),
		region: req.params.region.toLowerCase()
	};
	LolApiController.getRecentGamesWithSummoner(params, function(err, result) {
		if (err) {
			return next(err);
		}
		var games = Util.formatLolGames(result);
		res.json(games);
	});
});

router.get("/getAllChampions", function(req, res, next) {
	LolApiController.getAllChampions(function(err, result) {
		res.json(result);
	});
});

module.exports = router;