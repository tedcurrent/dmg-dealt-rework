"use strict";
var _ = require("lodash");
var fs = require("fs");
var champDataUtil = require("./champDataUtil");

// A collection of utility functions
var Util = {
	formatLolGames: function(games) {
		return _.map(games, function(game) {
			return {
				gameId: game.gameId,
				gameMode: game.gameMode,
				champion: champDataUtil.championIdToChampionName(game.championId),
				gameDate: game.createDate,
				dmgDealt: game.stats.totalDamageDealtToChampions,
				stats: {
					timePlayed: game.stats.timePlayed,
					kills: game.stats.championsKilled,
					deaths: game.stats.numDeaths,
					assists: game.stats.assists,
					largestMultiKill: game.stats.largestMultiKill,
					physicalDamage: game.stats.physicalDamageDealtPlayer,
					magicDamage: game.stats.magicDamageDealtPlayer
				}
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

module.exports = Util;