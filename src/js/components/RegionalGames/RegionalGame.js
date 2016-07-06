"use strict";

var React = require("React");
var SummonerInfo = require("../Game/SummonerInfo");
var GameWrapper = require("../Game");

// Similar to TopGame, but an <li> with extra visual details for regions
var RegionalGame = React.createClass({
	render: function() {
		var game = this.props.game.highScore.game;
		var summoner = this.props.game.highScore.summoner;
		var region = this.props.game._id;

		return (
			<li>
				<GameWrapper game={game} gameClass={"game-header top-game region " + region}>
					<SummonerInfo info={region.toUpperCase()} summoner={summoner} />
				</GameWrapper>
			</li>
		);
	}
});

module.exports = RegionalGame;