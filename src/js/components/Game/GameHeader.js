"use strict";

var React = require("react");
var GameBackground = require("./GameBackground");
var GameHeaderContainer = require("./GameHeaderContainer");

var GameHeader = React.createClass({
	render: function() {
		return (
			<div className={this.props.gameClass} onClick={this._clickHandler}>
				{this.props.children}
				<GameHeaderContainer game={this.props.game} />
				<GameBackground champion={this.props.game.champion} />
			</div>
			
		);
	},

	_clickHandler: function() {
		this.props.onClick();
	}
});

module.exports = GameHeader;