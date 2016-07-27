"use strict";

var React = require("react");
var GameBackground = require("./GameBackground");
var GameOverlay = require("./GameOverlay");
var GameHeaderContainer = require("./GameHeaderContainer");

var GameHeader = React.createClass({
	render: function() {
		return (
			<div className={this.props.gameClass} onClick={this.props.onClick}>
				{this.props.children}
				<GameHeaderContainer game={this.props.game} />
				<GameBackground champion={this.props.game.champion} />
				<GameOverlay statsOpen={this.props.statsOpen} />
			</div>
			
		);
	}
});

module.exports = GameHeader;