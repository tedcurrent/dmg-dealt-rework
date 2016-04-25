"use strict";

var React = require("React");
var Game = require("../PersonalGames/Game");
var Overlay = require("../PersonalGames/Overlay");
var SummonerInfo = require("../PersonalGames/SummonerInfo");

var RegionalGame = React.createClass({
	render: function() {
		var game = this.props.game.highScore.game;
		var summoner = this.props.game.highScore.summoner;
		var region = this.props.game._id;
		var className = region === "global" ? " global" : "";
		return (
			<div className={"game top-game region" + className}>
				<Overlay champion={game.champion} />
				<SummonerInfo region={region} summoner={summoner} />
				<Game key={game.id} game={game} />
			</div>
		);
	}
});

module.exports = RegionalGame;