"use strict";

var React = require("react");
var PersonalGames = require("../PersonalGames/");

var Main = React.createClass({
	handleRender: function() {
		var gameResults = this.props.gameResults;
		
		if (gameResults.games.length) {
			return (
				<PersonalGames gameResults={gameResults} />
			);
		} else {
			return (
				<div>{this.props.children}</div>
			);
		}
	},

	render: function() {
		return (
			<main>
				{this.handleRender()}
			</main>
		);
	}
});

module.exports = Main;