"use strict";

var express = require("express");
var router = express.Router();
var ScoreController = require("../controllers/scoreController");

router.get("/getGames/:name/:region", function(req, res, next) {
	var summonerInfo = {
			name: req.params.name,
			region: req.params.region
	};

	ScoreController.newScores(summonerInfo, function(err, result) {
		if (err) {
			return next(err);
		}
		res.json(result);
	});
});

module.exports = router;