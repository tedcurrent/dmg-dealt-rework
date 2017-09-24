"use strict";

import test from "tape";
import request from "supertest";
import mongoose from "mongoose";
import HighScoreController from "../../server/controllers/highScoreController";

const _config = {
	testSummoner: {
		id: 206757011,
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
	    dmgDealt: 120003,
	    stats: {
	    	timePlayed: 2312,
		    kills: 4,
		    deaths: 10,
		    assists: 10,
		    largestMultiKill: 1,
		    physicalDamage: 6899,
	    	magicDamage: 20059,
	    	trueDamage: 666
	    }
  	},

	api: {
		path: "localhost:3001/api"
	}
};

test("GET /getSummoner/:id/:region", (t) => {
	request(_config.api.path)
		.get("/getSummoner/" + _config.testSummoner.name + "/" + _config.testSummoner.region)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end((err, res) => {
			t.error(err);
			let result = JSON.parse(res.text);
			t.equal(result.name, _config.testSummoner.name, "Names should be equal");
			t.end();
		});
});

test("GET /getSummonerWithId/:id/:region", (t) => {
	request(_config.api.path)
		.get("/getSummonerWithId/" + _config.testSummoner.id + "/" + _config.testSummoner.region)
		.set('Accept', 'application/json')
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res) => {
			t.error(err);
			let result = JSON.parse(res.text);
			t.equal(result.id, _config.testSummoner.id, "ID's should be equal");
			t.end();
		});
});

test("GET /getGames/:summonerId/:region", (t) => {
	request(_config.api.path)
		.get("/getGames/" + _config.testSummoner.id + "/" + _config.testSummoner.region)
		.set('Accept', 'application/json')
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res) => {
			t.error(err);
			let result = JSON.parse(res.text);
			t.ok(result.length != 0, "Should return some games");
			t.end(); 
		});
});

test("GET /getRegionalScores", (t) => {
	request(_config.api.path)
		.get("/getRegionalScores")
		.set('Accept', 'application/json')
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res) => {
			t.error(err);
			let result = JSON.parse(res.text);
			t.ok(result.length, "Should contain games");
			t.end();
		});
});

test("POST /saveHighScore", (t) => {
	let query = _config.testSummoner;
	query.topGame = _config.testGame;

	request(_config.api.path)
		.post("/saveHighScore")
		.set('Accept', 'application/json')
		.send(query)
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res) => {
			t.error(err);
			let result = JSON.parse(res.text);
			t.equal(result.highScore.summoner.summonerId, query.id, "Should find summoner with ID");
			t.ok(result.highScore.game, "Should find a potential highScore");
			t.equal(result.newHighScore, true, "Should make a new highScore");
			t.end();
		});
});

test.onFinish(() => {
	mongoose.connect(process.env.MONGODB_CONNECTION, (err) => {
		if (err)
			throw new Error("Connection to MongoDB failed");
	});

	HighScoreController.removeScoreByIdAndRegion(_config.testSummoner.id, _config.testSummoner.region, (err) => {
		if (err)
			throw new Error("Clean up failed, please try again");
		mongoose.connection.close();
	});
});