"use strict";

var React = require("react");
var GameStatsDamageChart = require("./GameStatsDamageChart");
var shortid = require("shortid");

var GameStatsChartArea = React.createClass({
	render: function() {
		var chartName = "chart-" + shortid.generate();
		return (
			<div className="game-stats-chart-area">
				<GameStatsDamageChart stats={this.props.game.stats} chartName={chartName} />
			</div>
		);
	}
});

module.exports = GameStatsChartArea;