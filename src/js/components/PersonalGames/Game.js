"use strict";

var React = require("react");

var Game = React.createClass({
	// TODO: Make this into an util with the exact formatting to be displayed
	fixDate: function(unformattedDate) {
		var formattedDate = new Date(unformattedDate);
		return formattedDate.toString();
	},

	render: function() {
		var game = this.props.game;
		return (
			<div className="game-list">
				<span>{game.dmgDealt}</span>
				<span>{game.gameMode}</span>
				<span>{game.champion}</span>
				<span>{this.fixDate(game.gameDate)}</span>
			</div>
		);
	}
});

module.exports = Game;