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
		var topGame = this.props.topGame;
		
		return (
			<GameWrapper game={topGame} gameClass={topGameClass}>
				<SummonerInfo newHs={newHs} summoner={this.props.summoner} />
			</GameWrapper>
		);
	}
});

module.exports = TopGame;