"use strict";
var Util = require("./util");
var LolApiController = require("../controllers/lolApiController");
var _ = require("lodash");
var championData = require("../static/championData");

// A wrapper for several champion related functions
var ChampDataUtil = {
	/**
		* Gets champions via API and writes to given path
		* @param {string} The destination path for the champion data file 
	*/
	writeChampsToPath: function(writePath) {
		this.readChampsFromApi(function(str) {
			Util.writeStringToFile(writePath, str);
		});
	},

	/**
		* Read champions via LoL API
		* @param {function} Callback 
		* @return {function} Returns a callback with formatted champion data
	*/
	readChampsFromApi: function(callback) {
		LolApiController.getAllChampions(function(err, result) {
			if (err) {
				console.log(err.message);
				return;
			}

			var champions = this.formatChampData(result.data);
			var strChampions = Util.formatObjectToString(champions);
			callback(strChampions);
		}.bind(this));
	},

	/**
		* Returns only the needed information from champions
		* @param {array} An array of champion objects
		* @return {array} An array of formatted champion objects
	*/
	formatChampData: function(champions) {
		return _.map(champions, function(champion) {
			return {
				id: champion.id,
				name: champion.name
			};
		});
	},

	/**
		* Returns a champion name by champion id
		* @param {integer} Champion identifier 
		* @return {string} Champion name
	*/
	championIdToChampionName: function(championId) {
		return _.find(championData, function(champion) {
			return champion.id == championId;
		}).name;
	}
};

module.exports = ChampDataUtil;