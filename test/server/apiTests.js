"use strict";
var test = require("tape");
var request = require("superagent");
var LolApiController = require("../../server/controllers/lolApiController");
var HighScoreController = require("../../server/controllers/highScoreController");

var _testSummoner = {
	id: 51520537,
	name: "tetsii",
	profileIconId: 28,
	region: "euw",
	level: 30
}

test("Test summoner fetch with name and region", function(t) {
	LolApiController.getSummoner(_testSummoner, function(err, result) {
		t.equal(result.name, _testSummoner.name, "Names should be equal");
		t.end();
	});
});

test("Test summoner fetch with id and region", function(t) {
	LolApiController.getSummonerWithId(_testSummoner.id, _testSummoner.region, function(err, result) {
		t.equal(result.id, _testSummoner.id, "ID's should be equal");
		t.end();
	});
});

test("Test highScore search + db connectivity", function(t) {
	var req = {
		body: {
			id: 51520537,
			region: "euw"
		}
	};
	
	HighScoreController.findBySummonerId(req, function(err, result) {
		t.equal(result.summoner.id, req.body.id);
		t.end();
	});
});