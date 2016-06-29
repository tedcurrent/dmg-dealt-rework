"use strict";

var React = require("react");

var GameStatsChartArea = React.createClass({
	render: function() {
		return (
			<div className="game-stats-chart-area">
				<p>GameChartArea</p>
			</div>
		);
	}
});

module.exports = GameStatsChartArea;

// <GameStatsChartArea className="game-stats-chart-area">
// // 			<GameDamageChart className="game-stats-chart"></GameDamageChart>
// // 		</GameStatsChartArea>
// // 		<GameStatsDetailArea className="game-stats-detail-area">
// // 			<div>...</div>
// // 		</GameStatsDetailArea>