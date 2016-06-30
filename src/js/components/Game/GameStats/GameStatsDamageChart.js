"use strict";

var React = require("react");
var Chart = require("../../Common/Highcharts");
var Util = require("../../../util/utils");
var ChartOptions = require("../../../constants/ChartOptions");

// Damage stat pie chart rendered within every stats container
var GameStatsDamageChart = React.createClass({
	chartRef: undefined,

	componentDidMount: function() {
		this.updateChartData(this.props.stats);
	},

	componentWillReceiveProps: function(nextProps) {
		this.updateChartData(this.nextProps.stats);
	},

	updateChartData: function(stats) {
		this.refs[this.chartRef]
			.chart
			.series[0]
			.setData(Util.getChartDamages(stats));
	},

	render: function() {
		this.chartRef = this.props.chartName;
		
		return (
			<div className="damage-chart">
				{React.createElement(Chart, { 
					container: this.props.chartName, 
					options: ChartOptions.DAMAGE_DONUT_OPTIONS, 
					ref: this.props.chartName 
				})}
			</div>
		);
	}
});

module.exports = GameStatsDamageChart;
