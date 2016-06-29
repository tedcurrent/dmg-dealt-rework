"use strict";

var React = require("react");
var GameStatsAreas = require("./GameStatsAreas");

var GameStats = React.createClass({
	render: function() {
		return (
			<div className="game-stats">
				<h3>Stats</h3>
				<GameStatsAreas stats={this.props.stats} />
			</div>
		);
	}
});

module.exports = GameStats;


// <GameStats className="game-stats">
// 	<h2>Stats</h2>
// 	<GameStatsAreas className="game-stats-areas">
// 		<GameStatsChartArea className="game-stats-chart-area">
// 			<GameDamageChart className="game-stats-chart"></GameDamageChart>
// 		</GameStatsChartArea>
// 		<GameStatsDetailArea className="game-stats-detail-area">
// 			<div>...</div>
// 		</GameStatsDetailArea>
// 	</GameStatsAreas>
// </GameStats>