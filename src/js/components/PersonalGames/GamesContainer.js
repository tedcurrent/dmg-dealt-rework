"use strict";

var React = require("react");
var TopGame = require("./TopGame");
var GameList = require("./GameList");

var GamesContainer = React.createClass({
	render: function() {
		var results = this.props.results;
		return (
			<div className="games-container">
				<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
				<h2>Last 10 Days of DMG</h2>
				<GameList games={results.games}/>
			</div>
		);
	}
});

module.exports = GamesContainer;