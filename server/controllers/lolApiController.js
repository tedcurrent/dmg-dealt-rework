"use strict";

const fetch = require("node-fetch");
const AppConfig = require("../../appconfig");
const Util = require("../utils/util");

// League of Legends API logic
module.exports = class LolApiCtrl {
	static getSummoner(summonerInfoRaw, callback) {
		const name = summonerInfoRaw.name.replace(/\s+/g, "").toLowerCase();
		const region = summonerInfoRaw.region.toLowerCase();

		getLeagueDataCallback(`summoner/v3/summoners/by-name/${name}`, region, false, (err, result) => {
			if (err || !result || result.status && result.status.status_code == 404)
				return callback(null, {});

			const summoner = {
				id: result.accountId,
				name: result.name,
				profileIconId: result.profileIconId,
				region: region,
				level: result.summonerLevel
			};

			callback(err, summoner);
		});
	}

	static getSummonerWithId(id, region, callback) {
		getLeagueDataCallback(`summoner/v3/summoners/by-account/${id}`, region, false, (err, result) => {
			if (err || !result)
				return callback(null, {});

			const summoner = {
				id: result.accountId,
				name: result.name,
				profileIconId: result.profileIconId,
				region: region,
				level: result.summonerLevel
			};

			callback(err, summoner);
		});
	}

	static getRecentGamesWithSummonerInfo(summonerInfo, callback) {
		getLeagueDataCallback(`match/v3/matchlists/by-account/${summonerInfo.id}/recent`, summonerInfo.region, false, (err, result) => {
			if (err || !result)
				return callback(err, []);

			Promise.all(result.matches.map(match => this.getMatchPromise(match.gameId, summonerInfo.region)))
				.then(matches => {
					const games = Util.formatLolGames(matches, summonerInfo.id);
					callback(err, games);
				})
				.catch(err => {
					callback(err, [])
				});
		});
	}

	static getMatchPromise(matchId, region) {
		return getLeagueDataPromise(`match/v3/matches/${matchId}`, region, false).then(json => json);
	}

	static getAllChampions(callback) {
		getLeagueDataCallback("static-data/v3/champions?locale=en_US&tags=blurb&dataById=true", "euw", true, callback);
	}
}

function getLeagueDataCallback(details, region, weird, callback) {
	fetch(constructUrl(details, region, weird))
		.then(res => res.json())
		.then(json => callback(null, json))
		.catch(err => callback(err, null));
}

function getLeagueDataPromise(details, region, weird) {
	return fetch(constructUrl(details, region, weird)).then(res => res.json());
}

function formatRegion(region) {
	let formattedRegion = region;

	if (formattedRegion != "kr" && formattedRegion != "ru") {
		formattedRegion += "1";
	}

	return formattedRegion;
}

function constructUrl(details, region, weird) {
	return `https://${formatRegion(region)}.api.riotgames.com/lol/${details}${weird ? "&" : "?"}api_key=${AppConfig.LOL_API.API_KEY}`;
}