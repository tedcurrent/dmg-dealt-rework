"use strict";

var React = require("react");
var Game = require("./Game");
var SummonerInfo = require("./SummonerInfo");
var Overlay = require("./Overlay");

var TopGame = React.createClass({
	render: function() {
		var newHs = this.props.newHs;
		var topGameClass = "game top-game";
		topGameClass = newHs ? topGameClass + " new" : topGameClass + " old";
		var topGame = this.props.topGame;
		
		return (
			<div className={topGameClass}>
				<Overlay champion={topGame.champion} />
				<SummonerInfo newHs={newHs} summoner={this.props.summoner} />
				<Game key={topGame.gameId} game={topGame} />
			</div>
		);
	}
});

module.exports = TopGame;