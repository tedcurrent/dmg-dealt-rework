"use strict";

import React from "react";
import Chart from "../../Common/Highcharts";
import Util from "../../../util/utils";
import ChartOptions from "../../../constants/ChartOptions";

// Damage stat pie chart rendered within every stats container
export default class GameStatsDamageChart extends React.Component {
	constructor(props) {
		super(props);
		this._updateChartData = this._updateChartData.bind(this);
	}

	componentDidMount() {
		this._updateChartData(this.props.stats);
	}

	componentWillReceiveProps(nextProps) {
		this._updateChartData(nextProps.stats);
	}

	render() {
		this.chartRef = this.props.chartName;
		return (
			<div className="damage-chart">
				{React.createElement(Chart, { 
					container: this.props.chartName, 
					options: ChartOptions.DAMAGE_DONUT_OPTIONS, 
					ref: this.chartRef
				})}
			</div>
		);
	}

	_updateChartData(stats) {
		this.refs[this.chartRef]
			.chart
			.series[0]
			.setData(Util.getChartDamages(stats));
	}
}
