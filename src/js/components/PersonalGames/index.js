"use strict";

var React = require("react");
var TopGame = require("./TopGame");
var GameList = require("./GameList");
var SummonerInfo = require("./SummonerInfo");
var _ = require("lodash");

var PersonalGamesController = React.createClass({
	renderComponents: function() {
		var results = this.props.gameResults;
		if (results.errors === 0 && !_.isEmpty(results.summoner)) {
			return (
				<div>
					<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
					<h3>Last 10 Days of DMG</h3>
					<GameList games={results.games}/>
				</div>
			);
		} else if (results.errors > 0) {
			return (
				<span>There was an error in game search. Please try again.</span>
			);
		}
	},

	render: function() {
		return (
			<div className="games-container">
				{this.renderComponents()}
			</div>
		);
	}
});

module.exports = PersonalGamesController;