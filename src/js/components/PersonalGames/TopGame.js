"use strict";

var React = require("react");
var SummonerInfo = require("../Game/SummonerInfo");
var GameWrapper = require("../Game");

// Top game with summoner details and custom coloring, otherwise a regular game
var TopGame = React.createClass({
	render: function() {
		var newHs = this.props.newHs;
		var topGameClass = "game-header top-game";
		topGameClass = newHs ? topGameClass + " new" : topGameClass + " old";
		var infoMessage = newHs ? "New Top DMG" : "All-time top dmg";
		
		return (
			<GameWrapper game={this.props.topGame} gameClass={topGameClass}>
				<SummonerInfo info={infoMessage} summoner={this.props.summoner} />
			</GameWrapper>
		);
	}
});

module.exports = TopGame;