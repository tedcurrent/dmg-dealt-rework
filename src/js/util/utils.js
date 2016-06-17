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
	/**
		* Formats a date to a custom string
		* @param {date} Date in ISO format
		* @return {string} Date as string formatted to eg. 16 January, 2016
	*/
	fixDateToString: function(unformattedDate) {
		var formattedDate = new Date(unformattedDate);
		return moment(formattedDate).format("DD MMMM, YYYY");
	},

	/**
		* Deletes any games with no damage dealt champions (eg. player left game or the like)
		* @param {array} An array of game objects 
		* @return {array} A cleaned up array of game objects
	*/
	cleanEmptyDamages: function(gameArray) {
		return _.remove(gameArray, function(game) {
			return game.dmgDealt;
		});
	},

	/**
		* Creates an url to LoL static data for a profile icon
		* @param {int} Profile icon id 
		* @return {string} URL for profile image
	*/
	buildProfileIconUrl: function(iconId) {
		return AppConstants.LOL_STATIC_BASE_URL + "/" + AppConstants.LOL_API_VERSION + "/img/profileicon/" + iconId + ".png";
	},

	/**
		* Formats champion names to LOL static accepted format
		* @param {string} Champion name in any format 
		* @return {string} Formatted champion name 
	*/
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

	/**
		* Creates a url to LoL static data for a champion splash image
		* @param {string} Champion name in any format 
		* @return {string} URL for champion splash image
	*/
	championSplashUrl: function(championName) {
		var fullUrl = AppConstants.LOL_STATIC_BASE_URL + "/img/champion/splash/";
		var championNameUrlified = this.championNameForUrl(championName);
		var skinSelection = "_0.jpg";
		return fullUrl + championNameUrlified + skinSelection;
	}
};