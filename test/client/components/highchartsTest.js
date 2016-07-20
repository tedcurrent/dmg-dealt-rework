"use strict";

import React from "react";
import test from "tape";
import { mount } from "enzyme";
import { spy } from "sinon";
import Highcharts from "../../../src/js/components/Common/Highcharts";

const mockChart = () => {
	return {
		series: [
			{
				name: "Mock Series",
				data: [1, 2, 3]
			}
		]
	};
};

test("<Highcharts />", (t) => {
	spy(Highcharts.prototype, "componentDidMount");
	const wrapper = mount(
		<Highcharts 
			container={"chart"} 
			options={mockChart()}
		/>
	);
	t.ok(Highcharts.prototype.componentDidMount.calledOnce, "Should have called 'componentDidMount' once");
	t.ok(wrapper.contains(<div id="chart" />), "Should have '#chart' container");
	t.equals(wrapper.props().options.series.length, 1, "Should have one (1) series object")

	t.end();
});