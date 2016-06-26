"use strict";
var Util = require("./util");
var LolApiController = require("../controllers/lolApiController");
var _ = require("lodash");
var championData = require("../static/championData");

// A wrapper for several champion related functions
var ChampDataUtil = {
	writeChampsToPath: function(writePath) {
		this.readChampsFromApi(function(str) {
			Util.writeStringToFile(writePath, str);
		});
	},

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

	formatChampData: function(champions) {
		return _.map(champions, function(champion) {
			return {
				id: champion.id,
				name: champion.name
			};
		});
	},

	championIdToChampionName: function(championId) {
		return _.find(championData, function(champion) {
			return champion.id == championId;
		}).name;
	}
};

module.exports = ChampDataUtil;