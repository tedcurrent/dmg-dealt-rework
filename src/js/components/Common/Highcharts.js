"use strict";

var React = require("react");
var Highcharts = require("highcharts");
var ChartOptions = require("../../constants/ChartOptions");

// A highchart generator that can be used for any chart
module.exports = React.createClass({
	componentDidMount: function() {
		// Set global options
		Highcharts.setOptions(ChartOptions.GLOBAL_OPTIONS);
		
		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(Highcharts);
			});
		}

		this.chart = new Highcharts[this.props.type || "Chart"](
			this.props.container,
			this.props.options
		);
	},

	componentWillUnmount: function() {
		this.chart.destroy();
	},

	render: function() {
		return React.createElement("div", { id: this.props.container });
	}
});