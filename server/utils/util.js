"use strict";
var LolApi = require("../controllers/lolApiController");
var _ = require("lodash");
var fs = require("fs");
var champDataUtil = require("./champDataUtil");

var Utils = {
	formatLolGames: function(games, callback) {
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

	buildProfileIconUrl: function(iconId) {
		var patchVersion = "6.7.1";
		var url = "http://ddragon.leagueoflegends.com/cdn/" + patchVersion + "/img/profileicon/" + iconId + ".png";
		return url;
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