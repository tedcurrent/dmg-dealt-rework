"use strict";

const fetch = require("node-fetch");
const Util = require("../utils/util");
const LeagueUrlBuilder = require("../utils/leagueUrlBuilder");

// League of Legends API logic
module.exports = class LolApiController {
	static getSummoner(summonerInfoRaw, callback) {
		const name = summonerInfoRaw.name.replace(/\s+/g, "").toLowerCase();
		const region = summonerInfoRaw.region.toLowerCase();

		_getLeagueDataCallback(`summoner/v3/summoners/by-name/${name}`, region, false, (err, result) => {
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
		_getLeagueDataCallback(`summoner/v3/summoners/by-account/${id}`, region, false, (err, result) => {
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
		_getLeagueDataCallback(`match/v3/matchlists/by-account/${summonerInfo.id}/recent`, summonerInfo.region, false, (err, result) => {
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
		return _getLeagueDataPromise(`match/v3/matches/${matchId}`, region, false).then(json => json);
	}

	static getAllChampions(callback) {
		_getLeagueDataCallback("static-data/v3/champions?locale=en_US&tags=blurb&dataById=true", "euw", true, callback);
	}
}

function _getLeagueDataCallback(details, region, weird, callback) {
	fetch(LeagueUrlBuilder.constructUrl(details, region, weird))
		.then(res => res.json())
		.then(json => callback(null, json))
		.catch(err => callback(err, null));
}

function _getLeagueDataPromise(details, region, weird) {
	return fetch(LeagueUrlBuilder.constructUrl(details, region, weird)).then(res => res.json());
}