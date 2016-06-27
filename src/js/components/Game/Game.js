"use strict";

var React = require("react");
var Background = require("./Background");
var GameContainer = require("./GameContainer");

// A single game component used all around
var Game = React.createClass({
	render: function() {
		return (
			<div className={this.props.gameClass}>
				{this.props.children}
				<GameContainer game={this.props.game} />
				<Background champion={this.props.game.champion} />
			</div>
			
		);
	}
});

module.exports = Game;