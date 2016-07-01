"use strict";

var React = require("react");
var GameStatsDamageChart = require("./GameStatsDamageChart");
var shortid = require("shortid");

var GameStatsChartArea = React.createClass({
	render: function() {
		return (
			<div className="game-stats-chart-area">
				<GameStatsDamageChart 
					stats={this.props.game.stats} 
					chartName={"chart-" + shortid.generate()} 
				/>
			</div>
		);
	}
});

module.exports = GameStatsChartArea;