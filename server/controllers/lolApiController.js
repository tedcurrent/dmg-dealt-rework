"use strict";
var LolApi = require("leagueapi");
var AppConfig = require("../../appconfig");
var Util = require("../utils/util");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

var LolApiCtrl = {
	getSummoner: function(summonerInfoRaw, callback) {
		var name = summonerInfoRaw.name.replace(/\s+/g, "").toLowerCase();
		var region = summonerInfoRaw.region.toLowerCase();

		LolApi.Summoner.getByName(name, region, function(err, result) {
			if (err || !result) {
				return callback(null, {});
			}

			var summoner = {
				id: result[name].id,
				name: result[name].name,
				profileIconUrl: Util.buildProfileIconUrl(result[name].profileIconId),
				region: region,
				level: result[name].summonerLevel
			};

			callback(err, summoner);
		});
	},

	getRecentGamesWithSummonerInfo: function(summonerInfo, callback) {
		LolApi.getRecentGames(summonerInfo.id, summonerInfo.region, function(err, result) {
			var games = Util.formatLolGames(result);

			return callback(err, games);
		});
	},

	getAllChampions: function(callback) {
		var options = {
			champData: 'blurb',
			locale: 'en_US',
			dataById: true
		};
		LolApi.Static.getChampionList(options, callback);
	}
};

module.exports = LolApiCtrl;
