"use strict";

var React = require("react");
var Chart = require("../../Common/Highcharts");
var Util = require("../../../util/utils");

var _chartOptions = {
	chart: {
		backgroundColor: "#20232A",
		type: "pie",
		spacingTop: 0,
		spacingBottom: 0,
		spacingLeft: 0,
		spacingRight: 0
	},

	colors: ["#e06464", "#6464e0"],

	legend: {
		align: "right",
		itemStyle: {
			"color": "#f2f0de"
		},
		layout: "vertical",
		verticalAlign: "middle"
	},

	series: [
		{
			borderColor: "#20232A",
			name: "Damage done",
			data: [
				{name: "Physical damage", y: 0},
				{name: "Magic damage", y: 0}
			]
		}
	]
};

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
					options: _chartOptions, 
					ref: this.props.chartName 
				})}
			</div>
		);
	}
});

module.exports = GameStatsDamageChart;
