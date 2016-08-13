"use strict";

const LolApi = require("leagueapi");
const AppConfig = require("../../appconfig");
const Util = require("../utils/util");

LolApi.init(AppConfig.LOL_API.API_KEY, AppConfig.LOL_API.REGION);

// League of Legends API logic
module.exports = class LolApiCtrl {
	static getSummoner(summonerInfoRaw, callback) {
		const name = summonerInfoRaw.name.replace(/\s+/g, "").toLowerCase();
		const region = summonerInfoRaw.region.toLowerCase();

		LolApi.Summoner.getByName(name, region, (err, result) => {
			if (err || !result || !result[name])
				return callback(null, {});

			const summoner = {
				id: result[name].id,
				name: result[name].name,
				profileIconId: result[name].profileIconId,
				region: region,
				level: result[name].summonerLevel
			};

			callback(err, summoner);
		});
	}

	static getSummonerWithId(id, region, callback) {
		LolApi.Summoner.getByID(id, region, (err, result) => {
			if (err || !result)
				return callback(null, {});

			const summoner = {
				id: result[id].id,
				name: result[id].name,
				profileIconId: result[id].profileIconId,
				region: region,
				level: result[id].summonerLevel
			};

			callback(err, summoner);
		});
	}

	static getRecentGamesWithSummonerInfo(summonerInfo, callback) {
		LolApi.getRecentGames(summonerInfo.id, summonerInfo.region, (err, result) => {
			const games = Util.formatLolGames(result);

			callback(err, games);
		});
	}

	static getAllChampions(callback) {
		const options = {
			champData: 'blurb',
			locale: 'en_US',
			dataById: true
		};
		LolApi.Static.getChampionList(options, callback);
	}
}
