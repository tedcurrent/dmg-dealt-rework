"use strict";
var LolApiController = require("./lolApiController");
var HighScoreController = require("./highScoreController");
var _ = require("lodash");

var _results = {};

/**
	* An internal function used to initiate a save/update of a highScore in the database
	* @param {object} A request object from the client (eg. summoner id and region)
	* @param {object} A highScore object that was found for this particular summoner
	* @param {function} Callback
	* @return {function} A callback
*/
function _saveUpdate(req, oldHs, callback) {
	// This needs to be done, as this is initiated with a summoner id and region only.
	// Other details (like profileIconId and name) are found here.
	LolApiController.getSummonerWithId(req.body.id, req.body.region, function(err, summoner) {
		if (err) {
			return callback(err);
		}

		req.body.summoner = summoner;

		var saveParams = {
			req: req,
			highScore: oldHs
		};

		HighScoreController.saveUpdate(saveParams, function(err, newHs) {
			if (err) {
				return callback(err);
			}

			_results.highScore = newHs;
			_results.newHighScore = true;
			callback(err, _results);
		});
	});
};


//An abstraction for creating a "TOP TOP TOP" game eg. a global high score.
function _addGlobalScore() {
	var globalTopScore = _.clone(_results[0]);
	globalTopScore._id = "global";
	_results.unshift(globalTopScore);
};

// Top game/score handling logic for saving, updating and pulling data in and out of database
var ScoreController = {
	/**
		* Logic for saving a new highScore
		* @param {object} Request from client (eg. summoner id and region) 
		* @param {function} Callback
		* @return {function} A callback with an object containing old OR new highScore (depending if the user made one),
		* a newHighScore flag and a potential error
	*/
	newHighScore: function(req, callback) {
		_results = {};

		HighScoreController.findBySummonerId(req, function(err, oldHs) {
			if (err) {
				return callback(err);
			}

			if (!oldHs || req.body.topGame.dmgDealt > oldHs.game.dmgDealt) {
				_saveUpdate(req, oldHs, callback);
			} else {
				_results = {
					highScore: oldHs,
					newHighScore: false
				};

				callback(err, _results);
			}
		});
	},

	/**
		* Returns the top scores by region
		* @param {function} Callback
		* @return {function} An array containing highScore object from each region and a potential error
	*/
	getRegionalScores: function(callback) {
		_results = {};

		HighScoreController.getRegionalTopScores(function(err, result) {
			if (err || !result.length) {
				return callback(err, {});
			}
			_results = _.orderBy(result, ["highScore.game.dmgDealt"], ["desc"]);
			_addGlobalScore();
			callback(err, _results);
		});
	}
};

module.exports = ScoreController;