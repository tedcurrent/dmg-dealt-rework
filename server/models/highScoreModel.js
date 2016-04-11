"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortid = require("shortid");

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

	summonerId: {
		type: String,
		required: true
	},

	summonerName: {
		type: String,
		default: ""
	},

	profileIconUrl: {
		type: String,
		default: ""
	},

	region: {
		type: String,
		default: ""
	},

	game: {
		gameId: {
			type: String,
			default: ""
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
			type: String,
			default: ""
		},

		gameDate: {
			type: Date,
			default: Date.now
		}
	}
});

module.exports = mongoose.model("HighScore", highScoreModel);