"use strict";
var LolApi = require("../controllers/lolApiController");
var _ = require("lodash");
var fs = require("fs");
var champDataUtil = require("./champDataUtil");

// A collection of several utility functions
var Utils = {
	/**
		* Filters relevant data off league games
		* @param {array} A list of games
		* @return {array} A list of formatted games
	*/
	formatLolGames: function(games) {
		return _.map(games, function(game) {
			return {
				gameId: game.gameId,
				gameMode: game.gameMode,
				champion: champDataUtil.championIdToChampionName(game.championId),
				gameDate: game.createDate,
				dmgDealt: game.stats.totalDamageDealtToChampions
			};
		});
	},

	/**
		* Simple stringifier
		* @param {object} Any object
		* @return {string} Object in string format
	*/
	formatObjectToString: function(obj) {
		return JSON.stringify(obj);
	},

	/**
		* Writes any string to a given path
		* @param {string} Write path 
		* @param {string} String to write
	*/
	writeStringToFile: function(path, str) {
		try {
			fs.writeFileSync(path, str, "utf8");
		} catch(err) {
			console.log(err.message);
		}
		
	}
};

module.exports = Utils;