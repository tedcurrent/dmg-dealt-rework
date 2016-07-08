"use strict";

var React = require("react");
var GameStatsAreas = require("./GameStatsAreas");

var GameStats = React.createClass({
	render: function() {
		return (
			<div className="game-stats">
				<h3>Stats</h3>
				<GameStatsAreas game={this.props.game} />
			</div>
		);
	}
});

module.exports = GameStats;