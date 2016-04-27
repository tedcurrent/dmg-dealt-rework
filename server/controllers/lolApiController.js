"use strict";
var LolApi = require("leagueapi");
var AppConfig = require("../../appconfig");
var Util = require("../utils/util");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

// League of Legends API logic
var LolApiCtrl = {
	/**
		* Fetches information on a summoner (player) with name and region
		* @param {object} An object containing a summoner's name and region
		* @param {function} Callback
		* @return {function} Returns a callback with formatted information on a summoner
	*/
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
				profileIconId: result[name].profileIconId,
				region: region,
				level: result[name].summonerLevel
			};

			callback(err, summoner);
		});
	},

	/**
		* Fetches information on a summoner (player) with id and region
		* @param {object} An object containing a summoner's id and region
		* @param {function} Callback
		* @return {function} Returns a callback with formatted information on a summoner
	*/
	getSummonerWithId: function(id, region, callback) {
		LolApi.Summoner.getByID(id, region, function(err, result) {
			if (err || !result) {
				return callback(null, {});
			}

			var summoner = {
				id: result[id].id,
				name: result[id].name,
				profileIconId: result[id].profileIconId,
				region: region,
				level: result[id].summonerLevel
			};

			callback(err, summoner);
		});
	},

	/**
		* Gets the last ten (10) games a summoner has played
		* @param {object} Object containing at least the id and region of a summoner
		* @param {function} Callback
		* @return {type} Returns a formatted, max 10, object array of summoner's last games
	*/
	getRecentGamesWithSummonerInfo: function(summonerInfo, callback) {
		LolApi.getRecentGames(summonerInfo.id, summonerInfo.region, function(err, result) {
			var games = Util.formatLolGames(result);

			return callback(err, games);
		});
	},

	/**
		* Gets data of all champions in the game
		* NOTE: Only run with a task runner (new champions are added every 3+ months).
		* NOTE2: This is used because "recent games" returns championId's instead of names.
		* @param {function} Callback
		* @return {function} A raw list of champions in JSON format
	*/
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
