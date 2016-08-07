"use strict";

import React from "react";
import Highcharts from "highcharts";
import ChartOptions from "../../constants/ChartOptions";

// A HC generator that can be used for any chart
export default class HighChart extends React.Component {
	componentDidMount() {
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
	}

	componentWillUnmount() {
		this.chart.destroy();
	}

	render() {
		return React.createElement("div", { id: this.props.container });
	}
}