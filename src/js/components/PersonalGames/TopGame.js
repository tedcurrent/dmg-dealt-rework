"use strict";

var React = require("react");
var Game = require("../Common/Game");
var SummonerInfo = require("../Common/SummonerInfo");
var Overlay = require("../Common/Overlay");

// Top game with summoner details and custom coloring, otherwise a regular game
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