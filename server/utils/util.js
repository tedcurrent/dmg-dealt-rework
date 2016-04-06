"use strict";
var LolApi = require("../controllers/lolApiController");
var _ = require("lodash");

var Utils = {
	formatLolGames: function(games, callback) {
		return _.map(games, function(game) {
			return {
				gameMode: game.gameMode,
				championId: game.championId, // how to fix this to be an actual champion for each 
				gameDate: game.createDate,
				dmgDealt: game.totalDamageDealtToChampions
			};
		});
	}
};

module.exports = Utils;