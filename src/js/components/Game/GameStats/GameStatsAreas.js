"use strict";

var React = require("react");
var GameStatsChartArea = require("./GameStatsChartArea");
var GameStatsDetailArea = require("./GameStatsDetailArea");

var GameStatsAreas = React.createClass({
	render: function() {
		return (
			<div className="game-stats-area">
				<p>GameStatsAreas</p>
				<GameStatsChartArea stats={this.props.stats} />
				<GameStatsDetailArea stats={this.props.stats} />
			</div>
		);
	}
});

module.exports = GameStatsAreas;

// <GameStatsChartArea className="game-stats-chart-area">
// // 			<GameDamageChart className="game-stats-chart"></GameDamageChart>
// // 		</GameStatsChartArea>
// // 		<GameStatsDetailArea className="game-stats-detail-area">
// // 			<div>...</div>
// // 		</GameStatsDetailArea>