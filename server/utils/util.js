"use strict";
var LolApi = require("../controllers/lolApiController");
var _ = require("lodash");
var fs = require("fs");
var champDataUtil = require("./champDataUtil");

var Utils = {
	formatLolGames: function(games, callback) {
		return _.map(games, function(game) {
			return {
				gameMode: game.gameMode,
				champion: champDataUtil.championIdToChampionName(game.championId),
				gameDate: game.createDate,
				dmgDealt: game.stats.totalDamageDealtToChampions
			};
		});
	},

	formatObjectToString: function(obj) {
		return JSON.stringify(obj);
	},

	writeStringToFile: function(path, str) {
		try {
			fs.writeFileSync(path, str, "utf8");
		} catch(err) {
			console.log(err.message);
		}
		
	}
};

module.exports = Utils;