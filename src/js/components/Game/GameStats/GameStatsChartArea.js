"use strict";

var React = require("react");
var GameStatsDamageChart = require("./GameStatsDamageChart");

var GameStatsChartArea = React.createClass({
	render: function() {
		var chartName = "chart-" + this.props.game.gameId;
		return (
			<div className="game-stats-chart-area">
				<GameStatsDamageChart stats={this.props.game.stats} chartName={chartName} />
			</div>
		);
	}
});

module.exports = GameStatsChartArea;