"use strict";
var test = require("tape");
var request = require("supertest");

var _config = {
	testSummoner: {
		id: 51520537,
		name: "tetsii",
		profileIconId: 28,
		region: "euw",
		level: 30
	},

	testGame: {
	    gameId: 2337165086,
	    gameMode: "CLASSIC",
	    champion: "Morgana",
	    gameDate: 1444756345019,
	    dmgDealt: 120002,
	    stats: {
	    	timePlayed: 2312,
		    kills: 4,
		    deaths: 10,
		    assists: 10,
		    largestMultiKill: 1,
		    physicalDamage: 6899,
	    	magicDamage: 20059
	    }
  	},

	api: {
		path: "localhost:3001/api"
	}
};

test("GET /getSummoner/:id/:region", function(t) {
	request(_config.api.path)
		.get("/getSummoner/" + _config.testSummoner.name + "/" + _config.testSummoner.region)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function (err, res) {
			t.error(err);
			var result = JSON.parse(res.text);
			t.equal(result.name, _config.testSummoner.name, "Names should be equal");
			t.end();
		});
});

test("GET /getSummonerWithId/:id/:region", function(t) {
	request(_config.api.path)
		.get("/getSummonerWithId/" + _config.testSummoner.id + "/" + _config.testSummoner.region)
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end(function (err, res) {
			t.error(err);
			var result = JSON.parse(res.text);
			t.equal(result.id, _config.testSummoner.id, "ID's should be equal");
			t.end();
		});
});

test("GET /getGames/:summonerId/:region", function(t) {
	request(_config.api.path)
		.get("/getGames/" + _config.testSummoner.id + "/" + _config.testSummoner.region)
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end(function (err, res) {
			t.error(err);
			var result = JSON.parse(res.text);
			t.equal(result.length, 10, "Should return 10 games");
			t.end(); 
		});
});

test("GET /getRegionalScores", function(t) {
	request(_config.api.path)
		.get("/getRegionalScores")
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end(function (err, res) {
			t.error(err);
			var result = JSON.parse(res.text);
			t.ok(result.length, "Should contain games");
			t.end();
		});
});

test("POST /saveHighScore", function(t) {
	var query = _config.testSummoner;
	query.topGame = _config.testGame;

	request(_config.api.path)
		.post("/saveHighScore")
		.send(query)
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end(function (err, res) {
			t.error(err);
			var result = JSON.parse(res.text);
			t.equal(result.highScore.summoner.summonerId, query.id, "Should find summoner with ID");
			t.ok(result.highScore.game, "Should find a highScore");
			t.equal(result.newHighScore, true, "Should make a new highScore");
			t.end();
		});
});
