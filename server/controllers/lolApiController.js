"use strict";
var LolApi = require("leagueapi");
var AppConfig = require("../../appconfig");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

var LolApiCtrl = {
	getSummonerId: function(params, callback) {
		LolApi.Summoner.getByName(params.name, params.region, function(err, result) {
			callback(err, result);
		});
	},

	getRecentGamesBySummonerId: function(summonerId, callback) {
		LolApi.getRecentGames(summonerId, function(err, result) {
			callback(err, result);
		});
	},

	getRecentGamesWithSummoner: function(params, callback) {
		this.getSummonerId(params, function(err, result) {
			if (err) {
				return callback(err);
			}
			this.getRecentGamesBySummonerId(result[params.name].id, function(err, result) {
				return callback(err, result);
			});
		}.bind(this));
	},

	getChampionWithId: function(id, callback) {
		options = {
			champData: 'blurb',
			locale: 'en_US',
			dataById: true
		};
		LolApi.Static.getChampionById(id, options, callback);
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
