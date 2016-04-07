"use strict";
var LolApi = require("leagueapi");
var AppConfig = require("../../appconfig");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

var LolApiCtrl = {
	getSummonerId: function(params, callback) {
		LolApi.Summoner.getByName(params.name, params.region, function(err, result) {
			if (err) {
				return callback(err);
			}

			var summoner = {
				id: result[params.name].id,
				name: result[params.name].name,
				region: params.region
			};

			callback(err, summoner);
		});
	},

	getRecentGamesBySummonerId: function(summonerId, callback) {
		LolApi.getRecentGames(summonerId, function(err, result) {
			callback(err, result);
		});
	},

	getRecentGamesWithSummoner: function(req, callback) {
		var summonerInfo = {
			name: req.params.name.toLowerCase(),
			region: req.params.region.toLowerCase()
		};

		this.getSummonerId(summonerInfo, function(err, summoner) {
			if (err) {
				return callback(err);
			}
			
			this.getRecentGamesBySummonerId(summoner.id, function(err, result) {
				var gameInfo = {
					summoner: summoner,
					games: result
				}
				
				return callback(err, gameInfo);
			});
		}.bind(this));
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
