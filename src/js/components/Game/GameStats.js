"use strict";

var React = require("react");

var GameStats = React.createClass({
	render: function() {
		return (
			<div className="game-stats">{this.props.stats.timePlayed}</div>
		);
	}
});

module.exports = GameStats;