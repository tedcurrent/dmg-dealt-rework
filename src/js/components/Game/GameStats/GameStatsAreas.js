"use strict";

var React = require("react");
var GameStatsChartArea = require("./GameStatsChartArea");
var GameStatsDetailArea = require("./GameStatsDetailArea");

var GameStatsAreas = React.createClass({
	render: function() {
		return (
			<div className="game-stats-areas">
				<GameStatsChartArea game={this.props.game} />
				<GameStatsDetailArea stats={this.props.game.stats} />
			</div>
		);
	}
});

module.exports = GameStatsAreas;