"use strict";

var React = require("react");
var GameHeader = require("./GameHeader");
var GameStats = require("./GameStats");

// A wrapper for the game "header" and the stats view
var GameWrapper = React.createClass({
	render: function() {
		return (
			<div className="game-wrapper">
				<GameHeader game={this.props.game} gameClass={this.props.gameClass}>
					{this.props.children}
				</GameHeader>
			</div>
		);
	}
});

module.exports = GameWrapper;