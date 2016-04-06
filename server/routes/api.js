"use strict";

var express = require("express");
var router = express.Router();
var LolApiController = require("../controllers/lolApiController");

router.get("/getGames/:name/:region", function(req, res, next) {
	var params = {
		name: req.params.name.toLowerCase(),
		region: req.params.region.toLowerCase()
	};
	LolApiController.getRecentGamesWithSummoner(params, function(err, result) {
		if (err) {
			return next(err);
		}
		res.json(result);
	});
});

module.exports = router;