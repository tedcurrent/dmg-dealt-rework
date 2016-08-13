"use strict";

const _ = require("lodash");
const fs = require("fs");
const champDataUtil = require("./champDataUtil");

// A collection of utility functions
module.exports = class Util {
	static formatLolGames(games) {
		return _.map(games, (game) => {
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
					physicalDamage: game.stats.physicalDamageDealtToChampions,
					magicDamage: game.stats.magicDamageDealtToChampions,
					trueDamage: game.stats.trueDamageDealtToChampions
				}
			};
		});
	}

	static formatObjectToString(obj) {
		return JSON.stringify(obj);
	}
	
	static writeStringToFile(path, str) {
		try {
			fs.writeFileSync(path, str, "utf8");
		} catch(err) {
			console.log(err.message);
		}
		
	}
}