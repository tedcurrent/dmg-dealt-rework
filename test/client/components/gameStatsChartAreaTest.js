"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameStatsChartArea from "../../../src/js/components/Game/GameStats/GameStatsChartArea";

test("<GameStatsChartArea />", (t) => {
	const props = {
		game: {
			stats: {}
		}
	};
	const wrapper = shallow(<GameStatsChartArea {...props} />);
	const gameStatsDamageChart = wrapper.find("GameStatsDamageChart");

	t.ok(gameStatsDamageChart.length, "Should contain a <GameStatsDamageChart />");
	t.ok(gameStatsDamageChart.props().chartName, "Should have a chartName");

	t.end();
});