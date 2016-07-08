"use strict";

var React = require("react");
var GamesContainer = require("../Common/GamesContainer");
var TopGame = require("./TopGame");
var GameList = require("./GameList");

var PersonalContainer = React.createClass({
	render: function() {
		var results = this.props.results;
		return (
			<GamesContainer>
				<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
				<h2>Last 10 Games of DMG</h2>
				<GameList games={results.games}/>
			</GamesContainer>
		);
	}
});

module.exports = PersonalContainer;