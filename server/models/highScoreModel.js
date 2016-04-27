"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortid = require("shortid");

/**
	* A highScoreModel that contains all the properties for saving a game and a summoner
	* NOTE: Also contains the "gameId", which can be used to further expand this application
*/
var highScoreModel = new Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},

	date: {
		type: Date,
		default: Date.now
	},

	summoner: {
		summonerId: {
			type: Number,
			required: true
		},

		summonerName: {
			type: String,
			default: ""
		},

		profileIconId: {
			type: Number,
			default: 0
		},

		region: {
			type: String,
			default: ""
		}
	},

	game: {
		gameId: {
			type: Number,
			default: 0
		},

		gameMode: {
			type: String,
			default: ""
		},

		champion: {
			type: String,
			default: ""
		},

		dmgDealt: {
			type: Number,
			default: 0
		},

		gameDate: {
			type: Date,
			default: Date.now
		}
	}
});

module.exports = mongoose.model("HighScore", highScoreModel);