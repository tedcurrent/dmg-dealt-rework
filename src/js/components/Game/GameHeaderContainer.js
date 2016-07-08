"use strict";
var React = require("react");
var DateTimeUtils = require("../../util/dateTimeUtils");

// A visual wrapper for game elements
var GameHeaderContainer = React.createClass({
	render: function() {
		var game = this.props.game;
		return (
			<div className="game-header-container">
				<div className="game-header-details">
					<span>{game.gameMode}</span>
					<span>{game.champion}</span>
					<span>{DateTimeUtils.parseDate(game.gameDate)}</span>
				</div>
				<div className="game-dmg">
					<span>{game.dmgDealt}</span>
				</div>
			</div>
		);
	}
});

module.exports = GameHeaderContainer;
