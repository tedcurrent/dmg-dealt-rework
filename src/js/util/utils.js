"use strict";

var AppConstants = require("../constants/AppConstants");
var _ = require("lodash");
var moment = require("moment");

// A string capitalizer extension
String.prototype.capitalize = function() {
	return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2){ return p1+p2.toUpperCase(); } );
};

// Client side utilities
module.exports = {
	fixDateToString: function(unformattedDate) {
		var formattedDate = new Date(unformattedDate);
		return moment(formattedDate).format("DD MMMM, YYYY");
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
				return championName.toLowerCase().replace("'", "").replace(".", "").capitalize().replace(" ", "");
		}
	},

	championSplashUrl: function(championName) {
		var fullUrl = AppConstants.LOL_STATIC_BASE_URL + "/img/champion/splash/";
		var championNameUrlified = this.championNameForUrl(championName);
		var skinSelection = "_0.jpg";
		return fullUrl + championNameUrlified + skinSelection;
	}
};