"use strict";
var LolApi = require("leagueapi");
var AppConfig = require("../../appconfig");
var Util = require("../utils/util");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

var LolApiCtrl = {
	getRecentGamesWithSummoner: function(summonerInfo, callback) {
		this.getSummoner(summonerInfo, function(err, summoner) {
			if (err) {
				return callback(err);
			}
			
			this.getRecentGamesBySummonerId(summoner.id, function(err, result) {
				var gameInfo = {
					summoner: summoner,
					games: Util.formatLolGames(result)
				}

				return callback(err, gameInfo);
			});
		}.bind(this));
	},

	getSummoner: function(summonerInfoRaw, callback) {
		var name = summonerInfoRaw.name.replace(/\s+/g, "").toLowerCase();
		var region = summonerInfoRaw.region.toLowerCase();


		LolApi.Summoner.getByName(name, region, function(err, result) {
			if (err || !result) {
				return callback(err);
			}

			var summoner = {
				id: result[name].id,
				name: result[name].name,
				region: region
			};

			callback(err, summoner);
		});
	},

	getRecentGamesBySummonerId: function(summonerId, callback) {
		LolApi.getRecentGames(summonerId, function(err, result) {
			callback(err, result);
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

// Speed testing
// 1. get id + recent games --> 300-500ms
// 2. get id + recent games + champion formatting -> 380-580ms
