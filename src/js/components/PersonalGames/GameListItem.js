"use strict";

var React = require("react");
var GameWrapper = require("../Game");

var GameListItem = React.createClass({
	render: function() {
		return (
			<li>
				<GameWrapper game={this.props.game} gameClass="game-header" />
			</li>
		);
	}
});

module.exports = GameListItem;