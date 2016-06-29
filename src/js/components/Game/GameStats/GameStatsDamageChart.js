"use strict";

var React = require("react");
var Chart = require("../../Common/Highcharts");

var _options = {
	chart: {
		backgroundColor: "#20232A",
		renderTo: "chart",
		type: "pie",
		spacingTop: 0,
		spacingBottom: 0,
		spacingLeft: 0,
		spacingRight: 0,
		style: {
			fontFamily: "'Alegreya', 'serif'"
		}
	},

	credits: {
		enabled: false
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

	plotOptions: {
		pie: {
			size: "100%",
			dataLabels: {
				enabled: false
			},
			showInLegend: true,
			innerSize: "50%"
		}
	},

	series: [
		{
			borderColor: "#272c35",
			name: "Damage done",
			data: [
				{name: "Physical damage", y: 2},
				{name: "Magic damage", y: 1}
			]
		}
	],
	title: {
		text: ""
	}
};

// Damage stat pie chart rendered within every stats container
var GameStatsDamageChart = React.createClass({
	chartRef: undefined,

	componentWillReceiveProps: function(nextProps) {
		this.refs[this.chartRef].chart.series[0].setData(_getDamages(this.nextProps.stats));
	},

	render: function() {
		_options.series[0].data = _getDamages(this.props.stats);
		this.chartRef = this.props.chartName;
		
		return (
			<div className="damage-chart">
				{React.createElement(Chart, { 
					container: this.props.chartName, 
					options: _options, 
					ref: this.props.chartName 
				})}
			</div>
		);
	}
});

function _getDamages(stats) {
	return [
		{name: "Physical damage", y: stats.physicalDamage},
		{name: "Magic damage", y: stats.magicDamage}
	];
}

module.exports = GameStatsDamageChart;
