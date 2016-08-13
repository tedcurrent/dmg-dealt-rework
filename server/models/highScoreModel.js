"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const highScoreModel = new Schema({
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
		},

		stats : {
			timePlayed: {
				type: Number,
				default: 0
			},

			kills: {
				type: Number,
				default: 0
			},

			deaths: {
				type: Number,
				default: 0
			},

			assists: {
				type: Number,
				default: 0
			},

			largestMultiKill: {
				type: Number,
				default: 0
			},

			physicalDamage: {
				type: Number,
				default: 0
			},

			magicDamage: {
				type: Number,
				default: 0
			},

			trueDamage: {
				type: Number,
				default: 0
			}
		}
	}
});

module.exports = mongoose.model("HighScore", highScoreModel);