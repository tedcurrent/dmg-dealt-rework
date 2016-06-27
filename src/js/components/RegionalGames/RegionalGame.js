"use strict";

var React = require("React");
var SummonerInfo = require("../Game/SummonerInfo");
var GameWrapper = require("../Game/Wrapper");

// Similar to TopGame, but with extra visual details for regions
var RegionalGame = React.createClass({
	render: function() {
		var game = this.props.game.highScore.game;
		var summoner = this.props.game.highScore.summoner;
		var region = this.props.game._id;
		var regionName = region;

		return (
			<GameWrapper key={game.id} game={game} gameClass={"game top-game region " + regionName}>
				<SummonerInfo region={region} summoner={summoner} />
			</GameWrapper>
		);
	}
});

module.exports = RegionalGame;