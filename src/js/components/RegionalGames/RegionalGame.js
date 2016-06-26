"use strict";

var React = require("React");
var Game = require("../Common/Game");
var Background = require("../Common/Background");
var SummonerInfo = require("../Common/SummonerInfo");

// Similar to TopGame, but with extra visual details for regions
var RegionalGame = React.createClass({
	render: function() {
		var game = this.props.game.highScore.game;
		var summoner = this.props.game.highScore.summoner;
		var region = this.props.game._id;
		var regionName = region;

		return (
			<div className={"game top-game region " + regionName}>
				<Background champion={game.champion} />
				<SummonerInfo region={region} summoner={summoner} />
				<Game key={game.id} game={game} />
			</div>
		);
	}
});

module.exports = RegionalGame;