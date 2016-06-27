"use strict";

var React = require("react");
var Game = require("./Game");
var Stats = require("./Stats");

// A wrapper for the game "header" and the stats view
var Wrapper = React.createClass({
	render: function() {
		return (
			<div className="game-wrapper">
				<Game game={this.props.game} gameClass={this.props.gameClass}>
					{this.props.children}
				</Game>
			</div>
		);
	}
});

module.exports = Wrapper;