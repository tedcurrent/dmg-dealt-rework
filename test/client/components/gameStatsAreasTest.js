"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameStatsAreas from "../../../src/js/components/Game/GameStats/GameStatsAreas";

test("<GameStatsAreas />", (t) => {
	const props = {
		game: {
			stats: {}
		}
	};
	const wrapper = shallow(<GameStatsAreas {...props} />);

	t.ok(wrapper.find("GameStatsChartArea").length, "Should contain a <GameStatsChartArea />");
	t.ok(wrapper.find("GameStatsDetailArea").length, "Should contain a <GameStatsDetailArea />");

	t.end();
});