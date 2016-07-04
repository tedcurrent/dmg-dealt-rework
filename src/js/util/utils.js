"use strict";

var AppConstants = require("../constants/AppConstants");
var _ = require("lodash");
var moment = require("moment");

// A string capitalizer extension
String.prototype.capitalize = function() {
	return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1+p2.toUpperCase(); } );
};

// A static collection of utility methods
module.exports = {
	fixDateToString: function(unformattedDate) {
		return moment(new Date(unformattedDate)).format("DD MMMM, YYYY");
	},

	getMinuteFormat: function(seconds) {
		return seconds ? moment(seconds * AppConstants.MILLISECONDS).format("mm:ss") : "00:00";
	},

	getKDAFormat: function(kills, deaths, assists) {
		if (kills === undefined || deaths === undefined || assists === undefined)
			return "0/0/0";
		return kills + "/" + deaths + "/" + assists;
	},

	getMultikillFormat: function(multiKillNumber) {
		switch (multiKillNumber) {
			case 2:
				return AppConstants.DOUBLE_KILL;
			case 3:
				return AppConstants.TRIPLE_KILL;
			case 4:
				return AppConstants.QUADRA_KILL;
			case 5:
				return AppConstants.PENTA_KILL;
			default:
				return AppConstants.SINGLE_KILL;
		}
	},

	getChartDamages: function(stats) {
		return [
			{name: AppConstants.DAMAGE_PHYSICAL, y: stats.physicalDamage || 0},
			{name: AppConstants.DAMAGE_MAGIC, y: stats.magicDamage || 0},
			{name: AppConstants.DAMAGE_TRUE, y: stats.trueDamage || 0}
		];
	},

	cleanEmptyDamages: function(gameArray) {
		return _.remove(gameArray, function(game) {
			return game.dmgDealt;
		});
	},

	buildProfileIconUrl: function(iconId) {
		return AppConstants.LOL_STATIC_BASE_URL + "/" + AppConstants.LOL_API_VERSION + "/img/profileicon/" + iconId + ".png";
	},

	championNameForUrl: function(championName) {
		switch (championName) {
			case "Kog'Maw":
				return "KogMaw";
			case "Rek'Sai":
				return "RekSai";
			case "Jarvan IV":
				return "JarvanIV";
			case "Fiddlesticks":
				return "FiddleSticks";
			case "Wukong":
				return "MonkeyKing";
			default:
				return championName.toLowerCase()
					.replace(/\.|\'/g, "")
					.capitalize()
					.replace(" ", "");
		}
	},

	championSplashUrl: function(championName) {
		var fullUrl = AppConstants.LOL_STATIC_BASE_URL + "/img/champion/splash/";
		var championNameUrlified = this.championNameForUrl(championName);
		var skinSelection = "_0.jpg";
		return fullUrl + championNameUrlified + skinSelection;
	},

	isQueryLengthOk: function(query) {
		return !(query.length < AppConstants.QUERY_MIN_LENGTH && query.length !== 0);
	}
};